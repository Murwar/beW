import React, {Component} from 'react';

import './AddNewHotel.css';

class AddNewHotel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            description: '',
            room_number: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:3001/hotel/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                address: this.state.address,
                description: this.state.description,
                room_number: this.state.room_number    
            })
        }).then(_ => this.props.history.push('/accommodations'), error => {console.log(error); this.props.history.push('/accomodations')})
    }

    render() {
        const { name, address, _description, room_number } = this.state
        return (
            <div className={'add_new_hotel'}>
                <div className={'card_new_hotel'}>
                    <div className={'rectangle_new_hotel'}>
                        <form onSubmit={this.handleSubmit}>
                            <table>
                                <tr>
                                    <td colspan="2">
                                        <h1 className={'title_new_hotel'} >  Добавление нового объекта</h1>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1 className={'enterHotelData_new_hotel'} >  Название Объекта</h1>
                                    </td>

                                    <td>
                                        <input className={'input_data_name'} type="text" value={name} onChange={event => this.setState({name: event.target.value})} placeholder="введите название объекта" size="50" maxLength="50"></input>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1 className={'enterHotelData_new_hotel'} >  Адрес Объекта</h1>
                                    </td>

                                    <td>
                                        <input className={'input_data_adress'} type="text" value={address} onChange={event => this.setState({address: event.target.value})} placeholder="введите адрес объекта" size="100" maxLength="100"></input>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1 className={'enterHotelData_new_hotel'} >  Количество Номеров</h1>
                                    </td>

                                    <td>
                                        <input className={'input_data_rooms'} type="number" value={room_number} onChange={event => this.setState({room_number: event.target.value})} placeholder="введите количество номеров" size="5" maxLength="3"></input>
                                    </td>
                                </tr>
                            </table>
                            <div className={'horizontal'}>
                                <button className='button_save_new_hotel' type='submit'>
                                    Сохранить
                                </button>
                            
                                <button className={'button_cancel_new_hotel'}  onClick={this.props.history.goBack}> 
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

export default AddNewHotel;