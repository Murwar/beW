import React, { Component } from 'react';

import './DeleteRoom.css';

class DeleteRoom extends Component {
    render() {
        return (
            <div className={'delete_room'}>
                <div className={'rectangle_delete_room'}>

                    <table>
                        <tr >
                            <td colspan="2" >
                                <h1 className={'title_delete_room'} >  Удаление  номера</h1>
                            </td>
                        </tr>

                        <tr>
                            <td width="40%" >
                                <h1 className={'deleteRoomData'} > Номер</h1>
                            </td>
                            <td >
                                <input className={'input_delete_room'} type="text" name="room_name" value="номер" size="5" maxlength="3"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'} > Категория</h1>
                            </td>

                            <td  >
                                <input className={'input_delete_room'} type="text" name="category" value="категория" size="30" maxlength="50"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'} >  Количество мест в номере </h1>

                            </td>

                            <td>
                                <input className={'input_delete_room'} type="text" name="capacity" value="количество мест" size="30" maxlength="50"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'} >  Разрешения </h1>
                            </td>

                            <td>
                                <input className={'input_delete_room'} type="text" name="permissions" value="разрешения" size="30" maxlength="50"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'} >  Условия бронирования  </h1>
                            </td>

                            <td>
                                <input className={'input_delete_room'} type="text" name="room_booking " value=" условия для бронирования" size="5" maxlength="3"></input>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <h1 className={'deleteRoomData'} >  Комментарий  </h1>
                            </td>

                            <td>
                                <input className={'input_delete_room'} type="text" name="room_comment " value=" комментарий" size="5" maxlength="3"></input>
                            </td>
                        </tr>


                    </table>

                    <div className={'horizontal'}>

                        <a href="#openModal">
                            <button className={'button_delete_delete_room'}   >
                                Удалить
                        </button>
                        </a>

                        <button className={'button_cancel_delete_room'} onClick={this.props.history.goBack}>
                            Отмена
                                </button>

                    </div>


                    <div id="openModal" class="modalDialog">
                        <div>

                            <h1 className={'modal_title'} >Вы точно хотите удалить номер?</h1>


                            <button className={'button_modal_delete'}   >
                                Удалить
                        </button>

                            <button className={'button_cancel_modal'} onClick={this.props.history.goBack}>
                                Отмена
                                </button>
                        </div>
                    </div>


                </div>


            </div>


        );
    }




}

export default DeleteRoom;