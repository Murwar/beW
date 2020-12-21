import React, {useEffect, useState} from "react";
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
    Crosshair
} from 'react-vis';
import "react-vis/dist/style.css";
import '../dashboard/proceeds/proceeds_graph.css';
import useWindowWidth from '../../components/useWindowWidth';
import {DATA} from '../calendar/ApiCalendar.js';

export default function AvGraph() {

    function convertToPercentages() {
        let tmp = DATA;
        for (let i = 0; i < DATA[0].length; i++) {
            tmp[0][i].y = ((50 - (DATA[0][i].y)) / 50) * 100;
        }
        return tmp;
    }

    return (
        <div className={"proceeds"}>
            <div className={"proceeds_graph"}>
                <p className={"proceeds_title"}>Процент свободных номеров</p>
                <XYPlot
                    xType="ordinal"
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
                        data={convertToPercentages()[0]}
                        curve={'curveMonotoneX'}
                        opacity={1}
                        stroke={"#2196F3"}
                        strokeStyle="solid"
                        style={{}}/>
                </XYPlot>
            </div>
        </div>
    );
}
