import React, {useState} from "react";
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    Crosshair
} from 'react-vis';
import "react-vis/dist/style.css";
import './proceeds_graph.css';
import useWindowWidth from '../../WindowWidth';
import {DATA} from './proceeds_data';

export default function ProceedsGraph() {
    const [crosshairValues, setCrosshairValues] = useState([]);

    return (
        <div className={"proceeds"}>
            <div className={"proceeds_graph"}>
                <p className={"proceeds_title"}>Продажи</p>
                <XYPlot
                    onMouseLeave={() => setCrosshairValues([])}
                    width={useWindowWidth() >= 1161 ? 885 : 610} height={300}>
                    <HorizontalGridLines/>
                    <XAxis
                        attr="x"
                        attrAxis="y"
                        orientation="bottom"
                        tickSize={0}
                        tickFormat={function tickFormat(x) {
                            let c = new Date();
                            c.setDate(x);
                            return c.toLocaleDateString().substring(0, 5)
                        }}
                    />
                    <YAxis
                        attr="y"
                        attrAxis="x"
                        tickSize={0}
                        orientation="left"
                    />
                    <LineSeries
                        onNearestX={(value, {index}) =>
                            setCrosshairValues(DATA.map(d => d[index]))}
                        data={DATA[0]}
                        curve={'curveMonotoneX'}
                        opacity={1}
                        stroke={"#2196F3"}
                        strokeStyle="solid"
                        style={{}}/>
                    <Crosshair values={crosshairValues} titleFormat={(d) => ({
                        title: 'Дата', value: new Date(2020, 11, d[0].x).toLocaleDateString()
                    })} itemsFormat={(d) => [{title: 'Выручка', value: d[0].y}]}/>
                </XYPlot>
            </div>
        </div>
    );
}

