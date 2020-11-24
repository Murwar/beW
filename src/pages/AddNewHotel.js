import React, { Component } from 'react';

import './AddNewHotel.css';

class AddNewHotel extends Component {
    render() {
        return (
            <div className={'add_new_hotel'}>


                <div className={'card_new_hotel'}>

                    <div className={'rectangle_new_hotel'}>

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
                                    <input className={'input_data_name'} type="text" name="hotel_name" placeholder="введите название объекта" size="50" maxlength="50"></input>
                                </td>
                            </tr>


                            <tr>
                                <td>
                                    <h1 className={'enterHotelData_new_hotel'} >  Адрес Объекта</h1>
                                </td>

                                <td>
                                    <input className={'input_data_adress'} type="text" name="hotel_adress" placeholder="введите адрес объекта" size="100" maxlength="100"></input>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <h1 className={'enterHotelData_new_hotel'} >  Количество Номеров</h1>
                                </td>

                                <td>
                                    <input className={'input_data_rooms'} type="text" name="hotel_rooms" placeholder="введите количество номеров" size="5" maxlength="3"></input>
                                </td>
                            </tr>



                        </table>



                        <div className={'horizontal'}>
                           
                                <button className={'button_save_new_hotel'}  onClick={this.props.history.goBack}>
                                    Сохранить
                                </button>
                            
                                <button className={'button_cancel_new_hotel'}  onClick={this.props.history.goBack}> 
                                    Отмена
                                </button>
                          
                        </div>




                    </div>
                </div>

            </div>
        );
    }



}

export default AddNewHotel;