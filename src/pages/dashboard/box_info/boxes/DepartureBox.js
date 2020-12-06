import {DATA} from "../clients_data";
import ClientInfo from "../ClientInfo";
import React from "react";

export default function ArrivalsBox(props) {
    if (props.status === 2) {
        if (DATA[2].length === 0) {
            return (<p className={"empty_box"}>Нет отъездов - нет уборок!)</p>);
        }
        return DATA[2].map((item, index) =>
            <ClientInfo status={props.status} number={index}/>)
    }
}