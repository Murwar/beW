import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "../components/Navbar";
import {Redirect, Route, Switch} from "react-router";
import Dashboard from "./dashboard/Dashboard";
import ArrivalSchedule from "./ArrivalSchedule";
import BookingSchedule from "./BookingSchedule";
import Statistics from "./Statistics";
import Accommodations from "./Accommodations";
import Settings from "./Settings";
import './home_page.css'
import React from "react";
import isLoggedIn from "./login/is_logged_in";
import AddNewHotel from "./AddNewHotel";
import DeleteHotel from "./DeleteHotel";
import HotelSettings from "./HotelSettings";
import AddNewRoom from "./AddNewRoom";
import DeleteRoom from "./DeleteRoom";
import RoomSettings from "./RoomSettings";
import HotelFirst from "./HotelFirst";
import HotelSecond from "./HotelSecond";

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