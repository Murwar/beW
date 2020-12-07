import React, { Component } from 'react';

import './DeleteHotel.css';

class DeleteHotel extends Component {
    render() {
        return (
            <div className={'deleteHotel'}>

                <div className={'rectangle_delete_hotel'}>

                    <table>
                        <tr>
                            <td colspan="3">
                                <h1 className={'title_delete_hotel'} >  Удаление объекта</h1>
                            </td>
                        </tr>


                        <tr>
                            <td>
                                <h1 className={'enterHotelData_delete_hotel'} >  Название Объекта</h1>
                            </td>

                            <td>
                                <input className={'input_data_name'} type="text" name="hotel_name" value=" название объекта" size="50" maxlength="50"></input>
                            </td>
                        </tr>


                        <tr>
                            <td>
                                <h1 className={'enterHotelData_delete_hotel'} >  Адрес Объекта</h1>
                            </td>

                            <td>
                                <input className={'input_data_adress'} type="text" name="hotel_adress" value=" адрес объекта" size="100" maxlength="100"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterHotelData_delete_hotel'} > Количество номеров </h1>
                            </td>
                            <td>
                                <input className={'delete_hotel_rooms'} type="text" name="hotel_rooms" value=" количество номеров" size="5" maxlength="3"></input>
                            </td>
                        </tr>



                    </table>





                    <div className={'horizontal'}>
                        <a href="#openModal">
                            <button className={'button_delete_delete_hotel'}>
                                Удалить объект
                          </button>
                        </a>

                        <button className={'button_cancel_delete_hotel'} onClick={this.props.history.goBack}>
                            Отмена
                         </button>


                    </div>



                    <div id="openModal" class="modalDialog">
                        <div>

                            <h1 className={'modal_title'} >Вы точно хотите удалить объект?</h1>


                            <button className={'button_modal_delete'}   >
                                Удалить
                        </button>

                            <button className={'button_cancel_modal'} onClick={this.props.history.goBack}>
                                Отмена
                                </button>
                        </div>
                    </div>

                </div>


            </div >
        );
    }



}

export default DeleteHotel;