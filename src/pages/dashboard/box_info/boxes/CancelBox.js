import {DATA} from "../clients_data";
import ClientInfo from "../ClientInfo";
import React from "react";

export default function ArrivalsBox(props) {
    if (props.status === 3) {
        if (DATA[3].length === 0) {
            return (<p className={"empty_box"}>Отмен нет =)</p>);
        }
        return DATA[3].map((item, index) =>
            <ClientInfo status={props.status} number={index}/>)
    }
}