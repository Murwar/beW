import React, {useState} from "react";
import {
    XYPlot,
    Crosshair, VerticalBarSeries, XAxis, YAxis
} from 'react-vis';
import "react-vis/dist/style.css";
import {DATA} from "./arrivals_data";
import numberToDay from "../../../components/NumberToDay";

export default function ArrivalsGraph() {
    const [crosshairValues, setCrosshairValues] = useState([]);
    return (
        <div className={"arrivals"}>
            <div className={"bar_graph"}>
                <p className={"bar_graph_title"}>Заселения</p>
                <XYPlot
                    onMouseLeave={() => setCrosshairValues([])}
                    width={290} height={150}
                >
                    <YAxis

                        tickSize={0}
                    />
                    <XAxis
                        attr="x"
                        attrAxis="y"
                        orientation="bottom"
                        tickSize={0}
                        tickFormat={function tickFormat(d) {
                            return numberToDay(new Date(2021, 0, d).getDay());
                        }}
                    />
                    <VerticalBarSeries
                        onNearestX={(value, {index}) =>
                            setCrosshairValues(DATA.map(d => d[index]))}
                        data={DATA[0]}
                        opacity={1}
                        fill={"#2196f3"}
                        stroke={"#2196f3"}
                    />
                    <Crosshair values={crosshairValues} titleFormat={(d) => ({
                        title: 'Дата', value: new Date(2020, 11, d[0].x).toLocaleDateString()
                    })} itemsFormat={(d) => [{title: 'Количество заселений', value: d[0].y}]}/>
                </XYPlot>
            </div>
        </div>
    );
}