import React, {Component} from 'react';
import ProceedsGraph from "../dashboard/proceeds/ProceedsGraph";
import BookedGraph from "./BookedGraph";
import ProblemGraph from "./ProblemGraph";
import AvGraph from "./AvGraph";
import ArrivalsGraph from "../dashboard/arrivals_graph/ArrivalsGraph";
import VisitsGraph from "../dashboard/visits/VisitsGraph";
import TableArrival from "./TableArrival";
import TableSpending from "./TableSpending";

import "./statistics.css"

import ApiCalendar from '../calendar/ApiCalendar.js';


class Statistics extends Component {

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
            <div className="stat-main-block">
                <div className="large-title">Статистика</div>
                <hr class="separator"/>
                <div className="small-title">Финансы</div>

                <div className={"stat_proceeds"}>
                    <ProceedsGraph/>
                </div>
                <div className={"mini_table"}>
                    <TableSpending/>
                </div>
                <hr class="separator"/>
                <div className="small-title">Номера</div>
                <div className={"mini_table"}>
                    <TableArrival/>
                </div>
                <div className={"stat_book"}>
                    <BookedGraph/>
                </div>
                <div className={"stat_book"}>
                    <ProblemGraph/>
                </div>
                <div className={"stat_book"}>
                    <AvGraph/>
                </div>
                <div className={"mini_graphs"}>
                    <ArrivalsGraph/>
                </div>

                <hr class="separator"/>
                <div className="small-title">Сайт</div>
                <div className={"mini_graphs"}>
                    <VisitsGraph/>
                </div>
            </div>
        );
    }
}

export default Statistics;
