import React, {Component} from 'react';

import './RoomSettings.css';

class RoomSettings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: 0,
            error: null,
            number: '',
            category: '',
            capacity: 1,
            permissions: '',
            booking_condition: '',
            commentary: '',
            categories: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/room/' + this.props.match.params.room_number + '/', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                room_number: this.state.number,
                category: this.state.category,
                capacity: this.state.capacity,
                permissions: [this.state.permissions],
                booking_condition: this.state.booking_condition,
                commentary: this.state.commentary
            })
        }).then(_ => this.props.history.push('/accommodations/hotel/' + this.props.match.params.id + '/rooms'),
                error => {console.log(error); this.props.history.push('/accommodations/hotel/' + this.props.match.params.id + '/rooms')}
        )
    }

    componentDidMount() {
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/room/' + this.props.match.params.room_number + '/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    loaded: this.state.loaded + 1,
                    number: result.room_number,
                    category: result.category,
                    capacity: result.capacity,
                    permissions: result.permissions[0] === '' ? 'нет' : result.permissions[0],
                    booking_condition: result.booking_condition,
                    commentary: result.commentary
                })
            },
                error => {
                    this.setState({
                        loaded: this.state.loaded + 1,
                        error
                    })
                }
            )
        fetch('http://localhost:3001/categories/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    loaded: this.state.loaded + 1,
                    categories: result.categories
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
        this.setState({loaded: 0})
    }

    render() {
        const { loaded, error, number, category, capacity, permissions, booking_condition, commentary, categories } = this.state
        if (loaded !== 2) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else if (error !== null) {
            console.log(error)
            return (
                <div>
                    Error occured: {error.message}
                </div>
            )
        }
        return (
            <div className={'settingsRoom'}>
                <div className={'rectangle_new_room'}>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tr>
                                <td colspan="2">
                                    <h1 className={'set_room_title'}>  Настройка номера</h1>
                                </td>
                            </tr>

                            <tr>
                                <td width="40%">
                                    <h1 className={'enterRoomData'}> Номер</h1>
                                </td>
                                <td>
                                    <input className={'input_rooms'} type="text" value={number} onChange={event => this.setState({number: event.target.value})} placeholder="введите номер" size="5" maxLength="3"></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}> Категория</h1>
                                </td>

                                <td >
                                    <select required value={category} onChange={event => this.setState({category: event.target.value})} className={'input_rooms_select'}>
                                        {categories.map(category_ => 
                                            <option>{category_.name}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}>  Количество мест в номере </h1>

                                </td>

                                <td>
                                    <select required value={capacity} onChange={event => this.setState({capacity: event.target.value})} className={'input_rooms_select'}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}>  Разрешения </h1>
                                </td>

                                <td>
                                    <select required value={permissions} onChange={event => this.setState({permissions: event.target.value})} className={'input_rooms_select'}>
                                        <option>нет</option>
                                        <option>дети</option>
                                        <option>животные</option>
                                        <option>курение</option>
                                        <option>шум</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}>  Условия бронирования  </h1>
                                </td>

                                <td>
                                    <input className={'input_rooms'} type="text" value={booking_condition} onChange={event => this.setState({booking_condition: event.target.value})} placeholder="введите условия для бронирования" size="5"></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterRoomData'}>  Комментарий  </h1>
                                </td>

                                <td>
                                    <input className={'input_rooms'} type="text" value={commentary} onChange={event => this.setState({commentary: event.target.value})} placeholder="введите комментарий" size="5"></input>
                                </td>
                            </tr>


                        </table>

                        <div className={'horizontal'}>
                            <a href={'/accommodations/hotel/' + this.props.match.params.id + '/room/' + this.props.match.params.room_number + '/delete'}>
                                <button className={'button_settings_delete_room'} type='button'>
                                    Удалить номер
                                </button>
                            </a>

                            <button className={'button_settings_save_room'} type='submit'>
                                Сохранить
                            </button>

                            <button className={'button_settings_cancel_room'} onClick={this.props.history.goBack} type='button'>
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RoomSettings;