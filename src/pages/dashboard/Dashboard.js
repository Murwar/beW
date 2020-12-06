import React, {Component} from 'react';
import Calendar from "./calendar/Calendar";
import CardClients from "./cards/CardClients";
import CardArrivals from "./cards/CardArrivals";
import CardDeparture from "./cards/CardDeparture";
import CardCancel from "./cards/CardCancel";
import ProceedsGraph from "./proceeds/ProceedsGraph";
import VisitsGraph from "./visits/VisitsGraph";
import ArrivalsGraph from "./arrivals_graph/ArrivalsGraph";
import BoxInfo from "./box_info/BoxInfo";
import './dashboard.css'

class Dashboard extends Component {
    state = {
        cardStatus: 1
    }
    updateStatus = (value) => {
        this.setState({cardStatus: value})
    }

    render() {
        return (
            <div className='dashboard'>
                <div className={"left_column"}>
                    <CardClients updateStatus={this.updateStatus}/>
                    <CardArrivals updateStatus={this.updateStatus}/>
                    <CardDeparture updateStatus={this.updateStatus}/>
                    <CardCancel updateStatus={this.updateStatus}/>
                    <BoxInfo status={this.state.cardStatus}/>
                </div>
                <ProceedsGraph/>
                <div className={"right_column"}>
                    <Calendar/>
                    <VisitsGraph/>
                    <ArrivalsGraph/>
                </div>
            </div>
        );
    }
}

export default Dashboard;