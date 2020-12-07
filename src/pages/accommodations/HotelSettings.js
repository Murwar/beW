import React, { Component } from 'react';

import './HotelSettings.css';

class HotelSettings extends Component {
    render() {
        return (
            <div className={'add_new_hotel'}>

                <div className={'rectangle_set_hotel'}>

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





                    </table>

                    <table>
                        <tr>
                            <td>
                                <h1 className={'enterHotelData_new_hotel'} > Номера </h1>
                            </td>

                            <td>
                                <input className={'set_rooms'} type="text" name="hotel_rooms" placeholder="введите количество номеров" size="5" maxlength="3"></input>
                            </td>

                            <td>
                                <a href='/hotel_first' >
                                    <button className={'listButton_hsettings'}>
                                        перейти к списку номеров
                                    </button>
                                </a>
                            </td>
                        </tr>
                    </table>



                    <div className={'horizontal'}>
                        <a href='/delete_hotel' >
                            <button className={'button_delete_hotel_settings'}>
                                Удалить объект
                          </button>
                        </a>

                      
                            <button className={'button_save_settings_hotel'}  onClick={this.props.history.goBack}>
                                Сохранить изменения
                        </button>
                      

                      
                            <button className={'button_cancel_new_hotel'}  onClick={this.props.history.goBack}>
                                Отмена
                         </button>
                      

                    </div>

                </div>


            </div >
        );
    }



}

export default HotelSettings;