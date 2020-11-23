import React, { Component } from 'react';

import './Accommodations.css';


import hotel1 from '../resources/images/hote-1.jpeg'
import hotel2 from '../resources/images/hotel-2.jpg'
import hotel from '../resources/images/hotel.jpg'



class Accommodations extends Component {

    render() {
        return (
            <div className={'accommodations'}>
                <div className={'cards'}>
                    <div className={'vertical'}>
                        <div className={'horizontal'}>
                            <div className={'rectangle_accommodations'}>
                                <img src={hotel1} alt="Hotel-1" className={'image_accommodations'} ></img>
                                <p className={'textInCards_accommodations'}>“Отель 1” | 10 номеров.</p>
                                <p className={'textInCards_accommodations'}>Улица веселья 11.</p>

                                <div className={'horizontal'}>
                                    <a href='/hotel_settings' >
                                        <button className={'hotelSettingsButtom_accommodations'} >
                                            настроить
                                         </button>
                                    </a>
                                    <div >
                                        <a href='/hotel_first' >
                                            <button className={'roomsButton_accommodations'}>
                                                номера
                                            </button>
                                        </a>
                                    </div>
                                </div>


                            </div>
                            <div className={'rectangle_accommodations'}>
                                <img src={hotel2} alt="Hotel-2" className={'image_accommodations'} ></img>
                                <p className={'textInCards_accommodations'}>“Отель 2” | 8 номеров.</p>
                                <p className={'textInCards_accommodations'}>Улица ЖИЗНИ 11.</p>

                                <div className={'horizontal'}>
                                    <button className={'hotelSettingsButtom_accommodations'} >
                                        настроить
                                      </button>
                                    <button className={'roomsButton_accommodations'}>
                                        номера
                                     </button>
                                </div>


                            </div>
                            <div className={'rectangle'}>

                                <img src={hotel} alt="Hotel" className={'image_accommodations'} ></img>
                                <p className={'textInCards_accommodations'}>“Отель 2” | 12 номеров.</p>
                                <p className={'textInCards_accommodations'}>Улица УЧЕБЫ 11.</p>

                                <div className={'horizontal'}>
                                    <button className={'hotelSettingsButtom_accommodations'} >
                                        настроить
                                </button>
                                    <button className={'roomsButton_accommodations'}>
                                        номера
                                </button>
                                </div>

                            </div>
                        </div>
                        <div className={'horizontal'}>
                            <div className={'rectangle'}>

                                <img src={hotel1} alt="Hotel-1" className={'image_accommodations'} ></img>
                                <p className={'textInCards_accommodations'}>“Отель 4” | 9 номеров.</p>
                                <p className={'textInCards_accommodations'}>Улица НАДЕЖДЫ 11.</p>

                                <div className={'horizontal'}>
                                    <button className={'hotelSettingsButtom_accommodations'} >
                                        настроить
                                </button>
                                    <button className={'roomsButton_accommodations'}>
                                        номера
                                </button>
                                </div>

                            </div>
                            <div className={'rectangle'}>

                                <img src={hotel1} alt="Hotel-1" className={'image_accommodations'} ></img>
                                <p className={'textInCards_accommodations'}>“Отель 5” | 10 номеров.</p>
                                <p className={'textInCards_accommodations'}>Улица МИРА 11.</p>

                                <div className={'horizontal'}>

                                    <button className={'hotelSettingsButtom_accommodations'} >
                                        настроить
                                   </button>
                                    <button className={'roomsButton_accommodations'}>
                                        номера
                                    </button>
                                </div>

                            </div>


                            <div >
                                <a href='/add_new_hotel'>
                                    <button className={'buttonAddNewHotel_accommodations'}>
                                        ДОБАВИТЬ НОВЫЙ <br /> ОБЪЕКТ РАЗМЕЩЕНИЯ
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Accommodations;