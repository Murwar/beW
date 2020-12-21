import React from "react";
import './box_info.css';
import useWindowWidth from "../../../components/useWindowWidth";
import ArrivalsBox from "./boxes/ArrivalsBox";
import CancelBox from "./boxes/CancelBox";
import ClientsBox from "./boxes/ClientsBox";
import DepartureBox from "./boxes/DepartureBox";
import {STATUS_DATA} from "./status_data";

export default function BoxInfo(props) {
    function define(status) {
        switch (status) {
            case 0:
                return <ClientsBox status={status}/>;
            case 1:
                return <ArrivalsBox status={status}/>;
            case 2:
                return <DepartureBox status={status}/>;
            default:
                return <CancelBox status={status}/>;
        }
    }

    return (
        <div className={"box_info"}
             style={{width: useWindowWidth() >= 1161 ? 920 : 645}
             }>
            <p className={"box_title"}>{STATUS_DATA[props.status].status}</p>
            {define(props.status)}
        </div>
    )
}