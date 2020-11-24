import React, { Component } from 'react';

import './RoomSettings.css';

class RoomSettings extends Component {
    render() {
        return (
            <div className={'settingsRoom'}>
                <div className={'rectangle_new_room'}>

                    <table>
                        <tr >
                            <td colspan="2" >
                                <h1 className={'set_room_title'} >  Настройка номера</h1>
                            </td>
                        </tr>

                        <tr>
                            <td width="40%" >
                                <h1 className={'enterRoomData'} > Номер</h1>
                            </td>
                            <td >
                                <input className={'input_rooms'} type="text" name="room_name" placeholder="введите номер" size="5" maxlength="3"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterRoomData'} > Категория</h1>
                            </td>

                            <td  >
                                <select name="category" required className={'input_rooms_select'} >
                                    <option selected="selected">первое</option>
                                    <option >второе</option>
                                    <option >3</option>
                                    <option >4</option>
                                    <option >5</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterRoomData'} >  Количество мест в номере </h1>

                            </td>

                            <td>
                                <select name="category" required className={'input_rooms_select'} >
                                    <option selected="selected">первое</option>
                                    <option >второе</option>
                                    <option >3</option>
                                    <option >4</option>
                                    <option >5</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterRoomData'} >  Разрешения </h1>
                            </td>

                            <td>
                                <select name="category" required className={'input_rooms_select'} >
                                    <option selected="selected">первое</option>
                                    <option >второе</option>
                                    <option >3</option>
                                    <option >4</option>
                                    <option >5</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterRoomData'} >  Условия бронирования  </h1>
                            </td>

                            <td>
                                <input className={'input_rooms'} type="text" name="room_booking " placeholder="введите условия для бронирования" size="5" maxlength="3"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'enterRoomData'} >  Комментарий  </h1>
                            </td>

                            <td>
                                <input className={'input_rooms'} type="text" name="room_comment " placeholder="введите комментарий" size="5" maxlength="3"></input>
                            </td>
                        </tr>


                    </table>

                    <div className={'horizontal'}>
                        <a href='/delete_room' >
                            <button className={'button_settings_delete_room'}>
                                Удалить номер
                          </button>
                        </a>

                        <button className={'button_settings_save_room'} onClick={this.props.history.goBack} >
                            Сохранить
                                </button>

                        <button className={'button_settings_cancel_room'} onClick={this.props.history.goBack} >
                            Отмена
                                </button>

                    </div>


                </div>


            </div>


        );
    }

}

export default RoomSettings;