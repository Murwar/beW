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


class App extends Component {

    render() {
        return (
            <>
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route path={'/'} exact component={Dashboard}/>
                        <Route path={'/arrival_schedule'} component={ArrivalSchedule}/>
                        <Route path={'/booking_schedule'} component={BookingSchedule}/>
                        <Route path={'/statistics'} component={Statistics}/>
                        <Route path={'/accommodations'} component={Accommodations}/>
                        <Route path={'/settings'} component={Settings}/>
                        <Route path={'/logout'} component={Logout}/>
                    </Switch>
                </Router>
            </>

        )
    }

}

export default App;