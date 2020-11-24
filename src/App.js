import React, {Component} from 'react';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from "react-router";
import Dashboard from "./pages/Dashboard";
import ArrivalSchedule from "./pages/ArrivalSchedule";
import BookingSchedule from "./pages/BookingSchedule";
import './App.css';
import Statistics from "./pages/Statistics";
import Accommodations from "./pages/Accommodations";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import AddNewHotel from './pages/AddNewHotel';
import HotelSettings from './pages/HotelSettings';
import AddNewRoom from './pages/AddNewRoom';
import RoomSettings from './pages/RoomSettings';
import HotelFirst from './pages/HotelFirst';
import HotelSecond from './pages/HotelSecond';





class App extends Component {

    render() {
        return (
            <div className={'page'}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path={'/'} exact component={Dashboard}/>
                        <Route path={'/arrival_schedule'} component={ArrivalSchedule}/>
                        <Route path={'/booking_schedule'} component={BookingSchedule}/>
                        <Route path={'/statistics'} component={Statistics}/>
                        <Route path={'/accommodations'} component={Accommodations}/>
                        <Route path={'/settings'} component={Settings}/>
                        <Route path={'/logout'} component={Logout}/>
                        <Route path={'/add_new_hotel'} component={AddNewHotel}/>
                        <Route path={'/hotel_settings'} component={HotelSettings}/>
                        <Route path={'/add_new_room'} component={AddNewRoom}/>
                        <Route path={'/room_settings'} component={RoomSettings}/>
                        <Route path={'/hotel_first'} component={HotelFirst}/>
                        <Route path={'/hotel_second'} component={HotelSecond}/>
                       
                    </Switch>
                </Router>
            </div>

        )
    }

}

export default App;