import psycopg2
import argparse
from flask import Flask, request, Response, jsonify, make_response
from flask_cors import CORS
import itertools
import traceback
import json
import pandas
from typing import Optional

class ArgumentError(Exception):
    def __init__(self, reason: str, *args, **kwargs):
        super().__init__(self, reason, *args, **kwargs)

class Properties:
    def __init__(self, db_addr: str, db_port: int, db_name: str, db_user: str, db_pass: str, api_port: int):
        self.db_addr = db_addr
        self.db_port = db_port
        self.db_name = db_name
        self.db_user = db_user
        self.db_pass = db_pass
        self.api_port = api_port
        self._conn: Optional[psycopg2.extensions.connection] = None

    @property
    def conn_string(self) -> str:
        return f'host={self.db_addr} port={self.db_port} dbname={self.db_name}' \
            f' user={self.db_user} password={self.db_pass}'

    @property
    def conn(self):
        if self._conn is None or self._conn.closed:
            self._conn = psycopg2.connect(self.conn_string)
        return self._conn

    def close(self):
        if self._conn is not None:
            if not self._conn.closed:
                self._conn.close()
            self._conn = None


app = Flask(__name__)
props: Properties


@app.after_request
def after_request(response) -> Response:
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response


def ensure_tables() -> None:
    with props.conn.cursor() as cur:
        cur.execute('CREATE TABLE IF NOT EXISTS hotels ('
                ' id serial PRIMARY KEY NOT NULL,'
                ' name VARCHAR(60) NOT NULL,'
                ' address VARCHAR(100) NOT NULL,'
                " description text NOT NULL DEFAULT '',"
                ' room_number int NOT NULL'
                ')'
        )
        cur.execute('CREATE TABLE IF NOT EXISTS categories ('
                ' id serial PRIMARY KEY NOT NULL,'
                ' name VARCHAR(30) UNIQUE NOT NULL'
                ')'
        )
        cur.execute('CREATE TABLE IF NOT EXISTS permissions ('
                ' id serial PRIMARY KEY NOT NULL,'
                ' name VARCHAR(30) UNIQUE NOT NULL'
                ')'
        )
        cur.execute('CREATE TABLE IF NOT EXISTS rooms ('
                ' id serial PRIMARY KEY NOT NULL,'
                ' hotel_id int REFERENCES hotels(id) ON DELETE CASCADE NOT NULL,'
                ' room_number int NOT NULL,'
                ' capacity int NOT NULL,'
                ' category_id int REFERENCES categories(id) NOT NULL,'
                " permissions jsonb NOT NULL DEFAULT '{}',"
                " booking_condition text NOT NULL DEFAULT '',"
                " commentary text NOT NULL DEFAULT '',"
                ' UNIQUE(hotel_id, room_number)'
                ')'
        )
        cur.execute('SELECT name FROM categories')
        categories = set(map(lambda x: x[0], cur.fetchall()))
        for category in ('Стандарт','Одноместный','Двухместный','Люкс','Аппартаменты'):
            if category not in categories : 
                cur.execute('INSERT INTO categories (name) VALUES (%s)', (category,))

        cur.execute('SELECT name FROM permissions')
        permissions = set(map(lambda x: x[0], cur.fetchall()))
        for permission in ('нет','дети','животные','курение','шум'):
            if permission not in permissions : 
                cur.execute('INSERT INTO permissions (name) VALUES (%s)', (permission,))

        props.conn.commit()

# hotels


@app.route('/hotels/', methods=['GET'])
def get_hotels() -> Response:
    with props.conn.cursor() as cur:
        cur.execute(
            'SELECT id, name, address, description, room_number FROM hotels ORDER BY id')
        res = pandas.DataFrame(cur.fetchall(), columns=(
            'id', 'name', 'address', 'description', 'room_number'))
        return make_response(jsonify({'hotels': list(res.transpose().to_dict().values())}))


@app.route('/hotel/', methods=['POST'])
def add_hotel() -> Response:
    body = json.loads(request.data)
    if not ('name' in body and 'address' in body and 'description' in body and 'room_number' in body):
        raise ArgumentError('Missing one of the (name, address, description, room_number) in request body')
    with props.conn.cursor() as cur:
        cur.execute('INSERT INTO hotels (name, address, description, room_number) VALUES (%s, %s, %s, %s) RETURNING id',
                (body['name'], body['address'], body['description'], body['room_number']))
        props.conn.commit()
        return make_response(jsonify({'id': cur.fetchone()[0]}))


@app.route('/hotel/<id>/', methods=['GET'])
def get_hotel(id: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('SELECT name, address, description, room_number FROM hotels where id = %s', (id,))
        name, address, description, room_numer = cur.fetchone()
        return make_response(jsonify({'name': name, 'address': address, 'description': description, 'room_number': room_numer}))


@app.route('/hotel/<id>/', methods=['PUT'])
def update_hotel(id: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('SELECT name, address, description, room_number FROM hotels where id = %s', (id,))
        name, address, description, room_number = cur.fetchone()
        body = json.loads(request.data)
        name = body.get('name', name)
        address = body.get('address', address)
        description = body.get('description', description)
        room_number = body.get('room_number', room_number)
        cur.execute('UPDATE hotels SET name = %s, address = %s, description = %s, room_number = %s WHERE id = %s',
                (name, address, description, room_number, id))
        props.conn.commit()
    return make_response(jsonify({'result': f'updated hotel with id={id}'}))


@app.route('/hotel/<id>/', methods=['DELETE'])
def delete_hotel(id: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('DELETE FROM hotels where id = %s', (id,))
        props.conn.commit()
    return make_response(jsonify({'result': f'deleted hotel with id={id}'}))

# rooms


@app.route('/hotel/<hotel_id>/rooms/', methods=['GET'])
def get_rooms(hotel_id: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('SELECT r.id, r.room_number, r.capacity, c.name as category, r.permissions, r.booking_condition, r.commentary FROM'
                    ' rooms r JOIN categories c on r.category_id = c.id WHERE hotel_id = %s ORDER BY room_number', (hotel_id,))
        res = pandas.DataFrame(cur.fetchall(), columns=('id', 'room_number', 'capacity', 'category', 'permissions', 'booking_condition', 'commentary'))
    return make_response(jsonify({'rooms': list(res.transpose().to_dict().values())}))

@app.route('/hotel/<hotel_id>/room/<room_number>/', methods=['GET'])
def get_room(hotel_id: int, room_number: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('SELECT r.room_number, r.capacity, c.name as category, r.permissions, r.booking_condition, r.commentary FROM'
                    ' rooms r JOIN categories c on r.category_id = c.id WHERE hotel_id = %s AND room_number = %s', (hotel_id, room_number))
        room_number, capacity, category, permissions, booking_condition, commentary = cur.fetchone()
        return make_response(jsonify({'room_number': room_number, 'capacity': capacity, 'category': category,
                'permissions': permissions, 'booking_condition': booking_condition, 'commentary': commentary}))


@app.route('/hotel/<hotel_id>/room/<room_number>/', methods=['DELETE'])
def delete_room(hotel_id: int, room_number: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('DELETE FROM rooms where hotel_id = %s AND room_number = %s', (hotel_id, room_number))
        props.conn.commit()
    return make_response(jsonify({'result': f'deleted room with number={room_number} in hotel with id={hotel_id}'}))


@app.route('/hotel/<hotel_id>/room/', methods=['POST'])
def add_room(hotel_id: int) -> Response:
    body = json.loads(request.data)
    if not ('room_number' in body and 'capacity' in body and 'category' in body and 'permissions' in body):
        raise ArgumentError('Missing one of the (capacity, category) in request body')
    with props.conn.cursor() as cur:
        cur.execute('INSERT INTO rooms (hotel_id, room_number, capacity, category_id, permissions, booking_condition, commentary)'
                    ' VALUES (%s, %s, %s, (SELECT id from categories where name = %s), %s, %s, %s) RETURNING id',
                    (hotel_id, body['room_number'], body['capacity'], body['category'], json.dumps(body.get('permissions', dict())), body.get('booking_condition', ''), body.get('commentary', '')))
        props.conn.commit()
        return make_response(jsonify({'id': cur.fetchone()[0]}))


@app.route('/hotel/<hotel_id>/room/<room_number>/', methods=['PUT'])
def update_room(hotel_id: int, room_number: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('SELECT r.room_number, r.capacity, c.name as category, r.permissions, r.booking_condition, r.commentary FROM'
                    ' rooms r JOIN categories c on r.category_id = c.id WHERE hotel_id = %s AND r.room_number = %s', (hotel_id, room_number))
        room_number, capacity, category, permissions, booking_condition, commentary = cur.fetchone()
        body = json.loads(request.data)

        new_room_number = body.get('room_number', room_number)
        capacity = body.get('capacity', capacity)
        category = body.get('category', category)
        permissions = body.get('permissions', json.dumps(permissions))
        booking_condition = body.get('booking_condition', booking_condition)
        commentary = body.get('commentary', commentary)
        cur.execute('UPDATE rooms SET room_number = %s, capacity = %s, category_id = (SELECT id FROM categories WHERE name = %s), permissions = %s, booking_condition = %s,'
                ' commentary = %s WHERE hotel_id = %s AND room_number = %s',
                (new_room_number, capacity, category, json.dumps(permissions), booking_condition, commentary, hotel_id, room_number))
        props.conn.commit()
    return make_response(jsonify({'result': f'updated hotel with number={room_number} in hotel with id={hotel_id}'}))


# room categories

@app.route('/categories/', methods=['GET'])
def get_room_categories() -> Response:
    with props.conn.cursor() as cur:
        cur.execute('SELECT id, name FROM categories')
        res = pandas.DataFrame(cur.fetchall(), columns=('id', 'name'))
    return make_response(jsonify({'categories': list(res.transpose().to_dict().values())}))


@app.route('/category/', methods=['POST'])
def add_room_category() -> Response:
    body = json.loads(request.data)
    if not ('name' in body):
        raise ArgumentError("Missing 'name' parameter in request body")
    with props.conn.cursor() as cur:
        cur.execute(
            'INSERT INTO categories (name) VALUES (%s) RETURNING ID', (body['name'],))
        props.conn.commit()
        return make_response(jsonify({'id': cur.fetchone()[0]}))


@app.route('/category/<category_id>', methods=['DELETE'])
def delete_category(category_id: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('DELETE FROM categories where id = %s ', (category_id))
        props.conn.commit()
    return make_response(jsonify({'result': f'category  with id={category_id}'}))


# room permissions
#get permission
@app.route('/permissions/', methods=['GET'])
def get_permissions() -> Response:
    with props.conn.cursor() as cur:
        cur.execute('SELECT id, name FROM permissions')
        res = pandas.DataFrame(cur.fetchall(), columns=('id', 'name'))
    return make_response(jsonify({'permissions': list(res.transpose().to_dict().values())}))

#add permission
@app.route('/permission/', methods=['POST'])
def add_permission() -> Response:
    body = json.loads(request.data)
    if not ('name' in body):
        raise ArgumentError("Missing 'name' parameter in request body")
    with props.conn.cursor() as cur:
        cur.execute(
            'INSERT INTO permissions (name) VALUES (%s) RETURNING ID', (body['name'],))
        props.conn.commit()
        return make_response(jsonify({'id': cur.fetchone()[0]}))

#delete permission
@app.route('/permission/<permission_id>', methods=['DELETE'])
def delete_permission(permission_id: int) -> Response:
    with props.conn.cursor() as cur:
        cur.execute('DELETE FROM permissions where id = %s ', (permission_id))
        props.conn.commit()
    return make_response(jsonify({'result': f'permission  with id={permission_id}'}))





#error
@app.errorhandler(Exception)
def any_error(error: Exception) -> Response:
    props.conn.rollback()
    print(f'{request.method} {request.path}?{"&".join(map(lambda x: f"{x[0]}={x[1]}", request.args.items()))} finished with exception: "{error}""')
    print(f'Body: {request.data.decode()}')
    traceback.print_exc()
    return make_response(jsonify({
        'error': str(error),
        'error_type': str(type(error)),
        'path': request.path,
        'body': request.data.decode(),
        'params': '&'.join(map(lambda x: f'{x[0]}={x[1]}', request.args.items())),
        'trace': list(itertools.chain(*map(lambda x: x.split('\n'), traceback.format_tb(error.__traceback__))))
    }), 500)


@app.errorhandler(404)
def not_found_error(_) -> Response:
    return make_response(jsonify({
        'error': 'not found',
        'path': request.path,
        'params': '&'.join(map(lambda x: f'{x[0]}={x[1]}', request.args.items())),
    }), 404)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Starts up the provision API server')
    parser.add_argument('-H', '--db_addr', action='store', dest='db_addr',
                        help=f'postgres host address', type=str, default='localhost')
    parser.add_argument('-P', '--db_port', action='store', dest='db_port',
                        help=f'postgres port number', type=int, default=5432)
    parser.add_argument('-d', '--db_name', action='store', dest='db_name',
                        help=f'postgres database name', type=str, default='postgres')
    parser.add_argument('-U', '--db_user', action='store', dest='db_user',
                        help=f'postgres user name', type=str, default='postgres')
    parser.add_argument('-W', '--db_pass', action='store', dest='db_pass',
                        help=f'database user password', type=str, default='postgres')
    parser.add_argument('-p', '--port', action='store', dest='api_port',
                        help=f'postgres port number', type=int, default=3001)
    args = parser.parse_args()

    props = Properties(args.db_addr, args.db_port, args.db_name,
                       args.db_user, args.db_pass, args.api_port)

    ensure_tables()
    app.run(host='0.0.0.0', port=props.api_port)
