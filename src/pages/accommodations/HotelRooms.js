import React, { Component } from 'react';

import room1 from '../../resources/images/room1.jpg'

import './HotelRoom.css';

class HotelFirst extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            loaded: 0,
            hotel_name: null,
            rooms: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    loaded: this.state.loaded + 1,
                    hotel_name: result.name
                })
            },
                error => {
                    this.setState({
                        loaded: this.state.loaded + 1,
                        error
                    })
                }
            )
            
        fetch('http://localhost:3001/hotel/' + this.props.match.params.id + '/rooms/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    loaded: this.state.loaded + 1,
                    rooms: result.rooms
                })
            },
                error => {
                    this.setState({
                        loaded: this.state.loaded + 1,
                        error
                    })
                }
            )
    }

    componentWillUnmount() {
        this.setState({isLoaded: 0})
    }

    render() {
        const { error, loaded, hotel_name, rooms } = this.state;
        if (loaded !== 2) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else if (error !== null) {
            console.log(error)
            return (
                <div>
                    Error occured: {error.message}
                </div>
            )
        }
        let split_rooms = [];
        let i = 0
        let oneLine = 3
        while (i < rooms.length) {
            let cur = []
            for (let j = 0; j < oneLine; j++) {
                if (i === rooms.length) {
                    break
                }
                let room = rooms[i++]
                cur.push(
                    <div className={'rectangle'}>
                        <img src={room1} alt="Room-1" className={'image'}></img>
                        <p className={'textInCards'}>{room.room_number} | {room.category}</p>
                        
                        <div className={'horizontal'}>
                            <a href={'/accommodations/hotel/' + this.props.match.params.id + '/room/' + room.room_number + '/settings'}>
                                <button className={'roomSettingsButton'} type='button'>
                                    настроить
                                </button>
                            </a>
                        </div>
                    </div>
                )
            }
            split_rooms.push(cur)
        }
        if (split_rooms.length === 0 || split_rooms[split_rooms.length - 1].length === oneLine) {
            split_rooms.push([])
        }
        split_rooms[split_rooms.length - 1].push(
            <div>
                <a href={'/accommodations/hotel/' + this.props.match.params.id + '/rooms/add'}>
                    <button className={'buttonAddRoom'} type='button'>
                        ДОБАВИТЬ НОВЫЙ <br /> номер
                    </button>
                </a>
            </div>
        )
        return (
            <div className={'hotel_first'}>
                <h1 className={'title'} >{hotel_name}</h1>
                <div className={'roomCards'}>
                    <div className={'vertical'}>
                        {split_rooms.map(roomsline => 
                            <div className={'horizontal'}>
                                {roomsline.map(room => room)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}


export default HotelFirst;