import React, { Component } from 'react';

import './DeleteHotel.css';

class DeleteHotel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            hotel: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    hotel: result
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
        const { error, isLoaded, hotel } = this.state;
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
            <div className={'deleteHotel'}>
                <div className={'rectangle_delete_hotel'}>
                    <table>
                        <tr>
                            <td colspan="3">
                                <h1 className={'title_delete_hotel'}>  Удаление объекта</h1>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterHotelData_delete_hotel'}>  Название Объекта</h1>
                            </td>

                            <td>
                                <input className={'input_data_name'} type="text" value={hotel.name} placeholder=" название объекта" size="50" maxlength="50"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterHotelData_delete_hotel'}>  Адрес Объекта</h1>
                            </td>

                            <td>
                                <input className={'input_data_adress'} type="text" value={hotel.address} placeholder=" адрес объекта" size="100" maxlength="100"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterHotelData_delete_hotel'}> Количество номеров </h1>
                            </td>
                            <td>
                                <input className={'delete_hotel_rooms'} type="text" value={hotel.room_number} placeholder=" количество номеров" size="5" maxlength="3"></input>
                            </td>
                        </tr>
                    </table>
                    <div className={'horizontal'}>
                        <a href="#openModal">
                            <button className={'button_delete_delete_hotel'} type='button'>
                                Удалить объект
                          </button>
                        </a>

                        <button className={'button_cancel_delete_hotel'} onClick={this.props.history.goBack} type='button'>
                            Отмена
                        </button>
                    </div>

                    <div id="openModal" class="modalDialog">
                        <div>
                            <h1 className={'modal_title'}>Вы точно хотите удалить объект?</h1>
                            <button className={'button_modal_delete'} type='button' onClick={() => {
                                fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/', {
                                    method: 'delete'
                                }).then(_ => this.props.history.push('/accommodations'), err => alert('Failed to delete hotel:' + err.message))
                            }}>
                                Удалить
                            </button>

                            <button className={'button_cancel_modal'} onClick={this.props.history.goBack} type='button'>
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteHotel;