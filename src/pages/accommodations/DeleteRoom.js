import React, { Component } from 'react';

import './DeleteRoom.css';

class DeleteRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            room: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/room/' + this.props.match.params.room_number + '/')
            .then(res => res.json())
            .then(result => {
                result.permissions = result.permissions[0] === '' ? 'нет' : result.permissions[0]
                this.setState({
                    isLoaded: true,
                    room: result
                })
            },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentWillUnmount() {
        this.setState({ isLoaded: false })
    }

    render() {
        const { error, isLoaded, room } = this.state;
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
            <div className={'delete_room'}>
                <div className={'rectangle_delete_room'}>
                    <table>
                        <tr>
                            <td colspan="2">
                                <h1 className={'title_delete_room'}>  Удаление  номера</h1>
                            </td>
                        </tr>

                        <tr>
                            <td width="40%">
                                <h1 className={'deleteRoomData'}> Номер</h1>
                            </td>
                            <td>
                                <input className={'input_delete_room'} type="text" value={room.room_number} size="5" maxLength="3"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'}> Категория</h1>
                            </td>

                            <td >
                                <input className={'input_delete_room'} type="text" value={room.category} size="30"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'}>  Количество мест в номере </h1>

                            </td>

                            <td>
                                <input className={'input_delete_room'} type="text" value={room.capacity} size="30"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'}>  Разрешения </h1>
                            </td>

                            <td>
                                <input className={'input_delete_room'} type="text" value={room.permissions} size="30"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'}>  Условия бронирования  </h1>
                            </td>

                            <td>
                                <input className={'input_delete_room'} type="text" value={room.booking_condition} size="5"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'}>  Комментарий  </h1>
                            </td>

                            <td>
                                <input className={'input_delete_room'} type="text" value={room.commentary} size="5"></input>
                            </td>
                        </tr>
                    </table>

                    <div className={'horizontal'}>
                        <a href="#openModal">
                            <button className={'button_delete_delete_room'} type='button'>
                                Удалить
                            </button>
                        </a>

                        <button className={'button_cancel_delete_room'} onClick={this.props.history.goBack} type='button'>
                            Отмена
                        </button>
                    </div>

                    <div id="openModal" class="modalDialog">
                        <div>
                            <h1 className={'modal_title'}>Вы точно хотите удалить номер?</h1>

                            <button className={'button_modal_delete'} type='button' onClick={() => {
                                fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/room/' + this.props.match.params.room_number + '/', {
                                    method: 'delete'
                                }).then(_ => this.props.history.push('/accommodations/hotel/' + this.props.match.params.id + '/rooms'), err => alert('Failed to delete room:' + err.message))
                            }}>
                                Удалить
                            </button>

                            <button className={'button_cancel_modal'} onClick={this.props.history.goBack}>
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteRoom;