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
                    xType="ordinal"
                    onMouseLeave={() => setCrosshairValues([])}
                    width={useWindowWidth() >= 1161 ? 885 : 610} height={250}>
                    <HorizontalGridLines/>
                    <XAxis
                        attr="x"
                        attrAxis="y"
                        orientation="bottom"
                        tickSize={0}
                        tickFormat={function tickFormat(x) {
                            return new Date(Date.parse(x)).toLocaleDateString().substring(0, 2);
                        }}
                        title={
                            new Date(Date.parse(DATA[0][0].x)).toLocaleDateString('default', {month: 'long'})
                        }
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
                        title: 'Дата', value: new Date(Date.parse(d[0].x)).toLocaleDateString()
                    })} itemsFormat={(d) => [{title: 'Выручка', value: d[0].y}]}/>
                </XYPlot>
            </div>
        </div>
    );
}

