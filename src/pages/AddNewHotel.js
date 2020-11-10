import React, { Component } from 'react';

import './AddNewHotel.css';

class AddNewHotel extends Component {
    render() {
        return (
            <div className={'add_new_hotel'}>
                <h1 className={'title'} >  Добавление нового объекта</h1>
                <div className={'data'}>
                    <div className={'horizontal'}>
                        <div className={'vertical'}>

                            <h1 className={'enterHotelName'} >  Навзвание Объекта</h1>
                            <h1 className={'enterHotelAdress'} >  Адрес Объекта</h1>
                            <h1 className={'enterRoomsNumber'} >  Количество Номеров</h1>
                        </div>
                    </div>

                </div>



            </div>
        );
    }



}

export default AddNewHotel;