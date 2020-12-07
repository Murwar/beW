import React, {Component} from 'react';
import ProceedsGraph from "../dashboard/proceeds/ProceedsGraph";
import ArrivalsGraph from "../dashboard/arrivals_graph/ArrivalsGraph";
import VisitsGraph from "../dashboard/visits/VisitsGraph";
import "./statistics.css"

class Statistics extends Component {
    render() {
        return (
            <div className={'statistics'}>
                <h1 className={"stat_title"}>Statistics</h1>

                <div className={"stat_proceeds"}>
                    <ProceedsGraph/>
                </div>
                <div className={"mini_graphs"}>
                    <ArrivalsGraph/>
                    <VisitsGraph/>
                </div>
            </div>
        );
    }
}

export default Statistics;