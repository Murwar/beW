import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "../components/Navbar";
import {Redirect, Route, Switch} from "react-router";
import Dashboard from "./Dashboard";
import ArrivalSchedule from "./ArrivalSchedule";
import BookingSchedule from "./BookingSchedule";
import Statistics from "./Statistics";
import Accommodations from "./Accommodations";
import Settings from "./Settings";
import './home_page.css'
import React from "react";
import isLoggedIn from "./Login/is_logged_in";

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
                </Switch>
            </Router>
        </div>

    )

}

export default HomePage;