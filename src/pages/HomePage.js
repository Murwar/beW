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
import AddNewHotel from "./accommodations/AddNewHotel";
import DeleteHotel from "./accommodations/DeleteHotel";
import HotelSettings from "./accommodations/HotelSettings";
import AddNewRoom from "./accommodations/AddNewRoom";
import DeleteRoom from "./accommodations/DeleteRoom";
import RoomSettings from "./accommodations/RoomSettings";
import HotelFirst from "./accommodations/HotelFirst";
import HotelSecond from "./accommodations/HotelSecond";

const HomePage = ({history}) => {
    if (!isLoggedIn()) {
        return <Redirect to="/login"/>;
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
                    <Route path={'/accommodations'} component={Accommodations}/>
                    <Route path={'/settings'} component={Settings}/>
                    <Route path={'/add_new_hotel'} component={AddNewHotel}/>
                    <Route path={'/delete_hotel'} component={DeleteHotel}/>
                    <Route path={'/hotel_settings'} component={HotelSettings}/>
                    <Route path={'/add_new_room'} component={AddNewRoom}/>
                    <Route path={'/delete_room'} component={DeleteRoom}/>
                    <Route path={'/room_settings'} component={RoomSettings}/>
                    <Route path={'/hotel_first'} component={HotelFirst}/>
                    <Route path={'/hotel_second'} component={HotelSecond}/>
                </Switch>
            </Router>
        </div>

    )

}

export default HomePage;