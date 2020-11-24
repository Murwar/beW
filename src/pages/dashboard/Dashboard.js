import React, {Component} from 'react';
import Calendar from "./Calendar";
import CardClients from "./CardClients";
import CardArrivals from "./CardArrivals";
import CardDeparture from "./CardDeparture";
import CardCancel from "./CardCancel";

class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard'>
                <div className={"cards"}>
                    <CardClients/>
                    <CardArrivals/>
                    <CardDeparture/>
                    <CardCancel/>
                </div>
                <Calendar/>
            </div>
        );
    }
}

export default Dashboard;