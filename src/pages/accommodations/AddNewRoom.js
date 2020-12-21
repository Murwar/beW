import React, { Component } from 'react';

import './AddNewRoom.css';

class AddNewRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            number: '',
            category: '',
            capacity: 1,
            permissions: ['нет'],
            permissions_list: [],
            booking_condition: '',
            commentary: '',
            categories: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/room/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room_number: this.state.number,
                category: this.state.category,
                capacity: this.state.capacity,
                permissions: this.state.permissions,
                booking_condition: this.state.booking_condition,
                commentary: this.state.commentary
            })
        }).then(_ => this.props.history.push('/accommodations/hotel/' + this.props.match.params.id + '/rooms'),
            error => { console.log(error); this.props.history.push('/accommodations/hotel/' + this.props.match.params.id + '/rooms') }
        )
    }

    componentDidMount() {
        fetch('http://localhost:3001/categories/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    category: result.categories[0].name,
                    categories: result.categories,
                })
            },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )

        fetch('http://localhost:3001/permissions/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    loaded: this.state.loaded + 1,
                    permissions_list: result.permissions
                })
            },
                error => {
                    this.setState({
                        loaded: this.state.loaded + 1,
                        error
                    })
                }
            )
    }

    componentWillUnmount() {
        this.setState({ isLoaded: false })
    }

    render() {
        const { isLoaded, error, number, _category, _capacity, permissions, permissions_list, booking_condition, commentary, categories } = this.state
        if (!isLoaded) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else if (error != null) {
            console.log(error)
            return (
                <div>
                    Error occured: {error.message}
                </div>
            )
        }
        return (
            <div className={'add_new_room'}>
                <div className={'rectangle_new_room'}>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tr>
                                <td colspan="2" >
                                    <h1 className={'title_new_room'}> Добавление нового номера</h1>
                                </td>
                            </tr>

                            <tr>
                                <td width="40%" >
                                    <h1 className={'enterRoomData'}> Номер</h1>
                                </td>
                                <td >
                                    <input className={'input_rooms'} type="text" value={number} onChange={event => { this.setState({ number: event.target.value }) }} placeholder="введите номер" size="5" maxLength="3"></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Категория</h1>
                                </td>

                                <td>
                                    <select name="category" required onChange={event => { this.setState({ category: event.target.value }) }} className={'input_rooms_select'} >
                                        {categories.map(category =>
                                            <option>{category.name}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Количество мест в номере </h1>
                                </td>

                                <td>
                                    <select required onChange={event => { this.setState({ capacity: event.target.value }) }} className={'input_rooms_select'} >
                                        <option defaultChecked>1</option>
                                        <option >2</option>
                                        <option >3</option>
                                        <option >4</option>
                                        <option >5</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Разрешения </h1>
                                </td>

                                <td>
                                <input className={'show_permissions'} type="text" value={permissions.join(', ')} ></input>


                                    <select required onChange={event => {

                                        let perm = permissions

                                        if (event.target.value === 'нет'){
                                            perm = ['нет']
                                        } else {
                                            if (perm[0] === 'нет'){
                                                perm=[]
                                            }
                                            if (perm.indexOf(event.target.value) === -1) {
                                                perm.push(event.target.value)
                                            } else {
                                                perm.splice(perm.indexOf(event.target.value), 1)
                                            }
                                        }

                                        console.log(perm);

                                        this.setState({ permissions: perm })

                                    }} value={permissions} className={'input_permissions'} multiple='true' size='2'>

                                        {permissions_list.map(permission =>
                                            <option >{permission.name}</option>
                                        )}




                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Условия бронирования  </h1>
                                </td>

                                <td>
                                    <input className={'input_rooms'} type="text" value={booking_condition} onChange={event => { this.setState({ booking_condition: event.target.value }) }} placeholder="введите условия для бронирования" size="5"></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Состояние  </h1>
                                </td>

                                <td>
                                    <input className={'input_rooms'} type="text" value={commentary} onChange={event => { this.setState({ commentary: event.target.value }) }} placeholder="опишите состояние номера" size="5"></input>
                                </td>
                            </tr>
                        </table>

                        <div className={'horizontal'}>
                            <button className={'button_save_new_room'} type='submit'>
                                Сохранить
                            </button>

                            <button className={'button_cancel_new_room'} onClick={this.props.history.goBack} type='button'>
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddNewRoom;