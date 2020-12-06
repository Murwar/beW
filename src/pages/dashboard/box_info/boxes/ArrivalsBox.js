import {DATA} from "../clients_data";
import ClientInfo from "../ClientInfo";
import React from "react";

export default function ArrivalsBox(props) {
    if (props.status === 1) {
        if (DATA[1].length === 0) {
            return (<p className={"empty_box"}>Заездов сегодня нет, отдыхай ;)</p>);
        }
        return DATA[1].map((item, index) =>
            <ClientInfo status={props.status} number={index}/>)
    }
}