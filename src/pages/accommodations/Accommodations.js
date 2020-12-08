import React, {Component} from 'react';

import './Accommodations.css';


import hotel1 from '../../resources/images/hotel-1.jpeg'

class Accommodations extends Component {

    constructor(props) {
        super(props)
        this.state = {
          error: null,
          isLoaded: false,
          hotels: []
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:3001/hotels/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    isLoaded: true,
                    hotels: result.hotels
                })},
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                })}
            )
    }

    componentWillUnmount() {
        this.setState({isLoaded: false})
    }

    render() {
        const { error, isLoaded, hotels } = this.state;
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
        let split_hotels = [];
        let i = 0
        let oneLine = 3
        while (i < hotels.length) {
            let cur = []
            for (let j = 0; j < oneLine; j++) {
                if (i === hotels.length) {
                    break
                }
                let hotel = hotels[i++]
                cur.push(
                    <div className={'rectangle_accommodations'}>
                    <img src={hotel1} alt="Hotel-1" className={'image_accommodations'} ></img>
                    <p className={'textInCards_accommodations'}>{hotel.name} | {hotel.room_number} номеров.</p>
                    <p className={'textInCards_accommodations'}>{hotel.address}</p>

                    <div className={'horizontal'}>
                        <a href={'/accommodations/hotel/' + hotel.id + '/settings'}>
                            <button className={'hotelSettingsButtom_accommodations'} type='button'>
                                настроить
                            </button>
                        </a>
                        <div >
                            <a href={'/accommodations/hotel/' + hotel.id + '/rooms'} >
                                <button className={'roomsButton_accommodations'} type='button'>
                                    номера
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                )
            }
            split_hotels.push(cur)
        }
        if (split_hotels.length === 0 || split_hotels[split_hotels.length - 1].length === oneLine) {
            split_hotels.push([])
        }
        split_hotels[split_hotels.length - 1].push(
            <div>
                <a href='/accommodations/add_new_hotel'>
                    <button className={'buttonAddNewHotel_accommodations'} type='button'>
                        ДОБАВИТЬ НОВЫЙ <br /> ОБЪЕКТ РАЗМЕЩЕНИЯ
                    </button>
                </a>
            </div>
        )
        return (
            <div className={'accommodations'}>
                <div className={'cards'}>
                    <div className={'vertical'}>
                        {split_hotels.map(hotelline =>
                            <div className={'horizontal'}>
                                {hotelline.map(hotel => hotel)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Accommodations;