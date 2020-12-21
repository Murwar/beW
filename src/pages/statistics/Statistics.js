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
import DataCalendarLoader from "./DataCalendarLoader";

class Statistics extends Component {

    render() {
        DataCalendarLoader();
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
