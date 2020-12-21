import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "../components/Navbar";
import {Redirect, Route, Switch} from "react-router";
import Dashboard from "./dashboard/Dashboard";
import ArrivalSchedule from "./calendar/ArrivalSchedule";
import BookingSchedule from "./calendar/BookingSchedule";
import Statistics from "./statistics/Statistics";
import Accommodations from "./accommodations/Accommodations";
import Settings from "./settings/Settings";
import './home_page.css'
import React from "react";
import isLoggedIn from "./login/is_logged_in";

import AddNewHotel from './accommodations/AddNewHotel';
import HotelSettings from './accommodations/HotelSettings';
import AddNewRoom from './accommodations/AddNewRoom';
import RoomSettings from './accommodations/RoomSettings';
import HotelRooms from './accommodations/HotelRooms';
import DataCalendarLoader from "./statistics/DataCalendarLoader";


const HomePage = ({history}) => {
    if (!isLoggedIn()) {
        return <Redirect to="/login"/>;
    } else {
        DataCalendarLoader();
    }

    return (
        <div className={'page'}>
            <Router>
                <Navbar history={history}/>
                <Switch>
                    <Route path={'/'} exact component={Dashboard}/>
                    <Route path={'/arrival_schedule'} component={ArrivalSchedule}/>
                    <Route path={'/booking_schedule'} component={BookingSchedule}/>
                    <Route path={'/statistics'} component={Statistics}/>
                    <Route path={'/settings'} component={Settings}/>

                    <Route path={'/accommodations/add_new_hotel'} component={AddNewHotel}/>
                    <Route path={'/accommodations/hotel/:id/settings'} component={HotelSettings}/>
                    <Route path={'/accommodations/hotel/:id/rooms/add'} component={AddNewRoom}/>
                    <Route path={'/accommodations/hotel/:id/rooms'} component={HotelRooms}/>
                    <Route path={'/accommodations/hotel/:id/room/:room_number/settings'} component={RoomSettings}/>

                    <Route path={'/accommodations'} component={Accommodations}/>
                </Switch>
            </Router>
        </div>

    )

}

export default HomePage;