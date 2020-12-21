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
import ApiCalendar from '../calendar/ApiCalendar.js';

class Dashboard extends Component {
    state = {
        cardStatus: 1
    }
    updateStatus = (value) => {
        this.setState({cardStatus: value})
    }

    render() {
		    var date = new Date();
      var start = new Date(date.getFullYear(), date.getMonth(), 0);
      var end = new Date(date.getFullYear(), date.getMonth() + 1, -1);
      console.log(start);
      var loop = new Date(start);
      var nnn = 0;
      while (loop <= end) {
          nnn = nnn + 1
          var newDate = loop.setDate(loop.getDate() + 1);
          ApiCalendar.listBookedEvents(nnn, new Date(newDate), 50)
            ApiCalendar.listProblemEvents(nnn, new Date(newDate), 50)
          loop = new Date(newDate);
      }
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