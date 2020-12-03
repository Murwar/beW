import React, {Component} from 'react';
import Calendar from "./calendar/Calendar";
import CardClients from "./cards/CardClients";
import CardArrivals from "./cards/CardArrivals";
import CardDeparture from "./cards/CardDeparture";
import CardCancel from "./cards/CardCancel";
import ProceedsGraph from "./proceeds/ProceedsGraph";
import VisitsGraph from "./visits/VisitsGraph";
import ArrivalsGraph from "./arrivals_graph/ArrivalsGraph";

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
                <ProceedsGraph/>
                <Calendar/>
                <VisitsGraph/>
                <ArrivalsGraph/>
            </div>
        );
    }
}

export default Dashboard;