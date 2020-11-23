import React, { Component } from 'react';

import room1 from '../resources/images/room1.jpg'
import room2 from '../resources/images/room2.jpg'
import room3 from '../resources/images/room3.jpg'


import './Hotel.css';

class HotelFirst extends Component {
    render() {
        return (
            <div className={'hotel_first'}>
                <h1 className={'title'} >“Отель 1”</h1>
                <div className={'roomCards'}>
                    <div className={'vertical'}>
                        <div className={'horizontal'}>
                            <div className={'rectangle'}>
                                <img src={room1} alt="Room-1" className={'image'} ></img>
                                <p className={'textInCards'}>descrition</p>
                               
                                <div className={'horizontal'}>
                                    <button className={'roomSettingsButtom'} >
                                        настроить
                                </button>
                                    
                                </div>


                            </div>
                            <div className={'rectangle'}>
                                <img src={room2} alt="Room-2" className={'image'} ></img>
                                <p className={'textInCards'}>descrition</p>
                               
                                <div className={'horizontal'}>
                                    <button className={'roomSettingsButtom'} >
                                        настроить
                                </button>
                                
                                </div>


                            </div>
                            <div className={'rectangle'}>

                                <img src={room1} alt="Room-1" className={'image'} ></img>
                                <p className={'textInCards'}>descrition</p>
                               
                                <div className={'horizontal'}>
                                    <button className={'roomSettingsButtom'} >
                                        настроить
                                </button>
                                    
                                </div>

                            </div>
                        </div>
                        <div className={'horizontal'}>
                            <div className={'rectangle'}>

                                <img src={room3} alt="Room3" className={'image'} ></img>
                                <p className={'textInCards'}>descrition</p>
                               
                                <div className={'horizontal'}>
                                    <button className={'roomSettingsButtom'} >
                                        настроить
                                </button>
                                   
                                </div>

                            </div>

                            <div >
                                <a href='/add_new_room'>
                                    <button className={'buttonAddRoom'}>
                                        ДОБАВИТЬ НОВЫЙ <br /> номер
                                    </button>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        );
    }
}


export default HotelFirst;