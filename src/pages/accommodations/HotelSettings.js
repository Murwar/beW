import React, { Component } from 'react';

import './HotelSettings.css';
import './DeleteModal.css';

class HotelSettings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            name: '',
            address: '',
            description: '',
            room_number: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log('Updated?')
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                address: this.state.address,
                description: this.state.description,
                room_number: this.state.room_number
            })
        }).then(_ => this.props.history.push('/accommodations'), error => { console.log(error); this.props.history.push('/accommodations') })
    }

    componentDidMount() {
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    name: result.name,
                    address: result.address,
                    description: result.description,
                    room_number: result.room_number
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
        this.setState({isLoaded: false})
    }

    render() {
        const { error, isLoaded, name, address, _description, room_number } = this.state;
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
            <div className={'add_new_hotel'}>
                <div className={'rectangle_set_hotel'}>
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tr>
                                <td colspan="3">
                                    <h1 className={'title_set_hotel'} >  настройка объекта</h1>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterHotelData_new_hotel'} >  Название Объекта</h1>
                                </td>

                                <td>
                                    <input className={'input_data_name'} type="text" value={name} onChange={event => this.setState({ name: event.target.value })} placeholder="введите название объекта" size="50" maxLength="50"></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterHotelData_new_hotel'} >  Адрес Объекта</h1>
                                </td>

                                <td>
                                    <input className={'input_data_adress'} type="text" value={address} onChange={event => this.setState({ address: event.target.value })} placeholder="введите адрес объекта" size="100" maxLength="100"></input>
                                </td>
                            </tr>
                        </table>

                        <table>
                            <tr>
                                <td>
                                    <h1 className={'enterHotelData_new_hotel'} > Номера </h1>
                                </td>

                                <td>
                                    <input className={'set_rooms'} type="number" value={room_number} onChange={event => this.setState({ room_number: event.target.value })} placeholder="введите количество номеров" size="5" maxLength="3"></input>
                                </td>

                                <td>
                                    <a href={'/accommodations/hotel/' + this.props.match.params.id + '/rooms'}>
                                        <button className={'listButton_hsettings'} type='button'>
                                            перейти к списку номеров
                                        </button>
                                    </a>
                                </td>
                            </tr>
                        </table>
                        <div className={'horizontal'}>

                        <a href="#openModal">
                            <button className={'button_delete_hotel_settings'} type='button'>
                                Удалить объект
                          </button>
                        </a>

                            <button className={'button_save_settings_hotel'} type='submit'>
                                Сохранить изменения
                            </button>

                            <button className={'button_cancel_new_hotel'} type='button' onClick={this.props.history.goBack}>
                                Отмена
                            </button>
                        </div>
                    </form>

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
            </div >
        )
    }
}

export default HotelSettings;