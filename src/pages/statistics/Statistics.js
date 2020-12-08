import React, {Component} from 'react';
import ProceedsGraph from "../dashboard/proceeds/ProceedsGraph";
import BookedGraph from "../dashboard/proceeds/BookedGraph";
import ArrivalsGraph from "../dashboard/arrivals_graph/ArrivalsGraph";
import VisitsGraph from "../dashboard/visits/VisitsGraph";
import "./statistics.css"
import ApiCalendar from '../calendar/ApiCalendar.js';

var DATA = [[
    {
        x: 'Nov 9, 2020',
        y: 10000
    }
]];

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
            loop = new Date(newDate);
        }

        return (
            <div className="main-block">
                <div className="s-title">Статистика</div>
                <hr class="separator"/>


                <div className={"stat_proceeds"}>
                    <ProceedsGraph/>
                </div>
                <div className={"stat_book"}>
                    <BookedGraph/>
                </div>
                <div className={"mini_graphs"}>
                    <div className={"stat_arrivals"}>
                        <ArrivalsGraph/>
                    </div>

                    <div className={"stat_visits"}>
                        <VisitsGraph/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Statistics;
