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
import DataCalendarLoader from "../statistics/DataCalendarLoader";

class Dashboard extends Component {
    state = {
        cardStatus: 1
    }
    updateStatus = (value) => {
        this.setState({cardStatus: value})
    }

    render() {
        DataCalendarLoader();
        return (
            <div className='dashboard'>
                <div className={"left_column"}>
                    <CardClients status={this.state.cardStatus} updateStatus={this.updateStatus}/>
                    <CardArrivals status={this.state.cardStatus} updateStatus={this.updateStatus}/>
                    <CardDeparture status={this.state.cardStatus} updateStatus={this.updateStatus}/>
                    <CardCancel status={this.state.cardStatus} updateStatus={this.updateStatus}/>
                    <BoxInfo status={this.state.cardStatus}/>
                </div>
                <div className={"dashboard_proceeds"}>
                    <ProceedsGraph/>
                </div>
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