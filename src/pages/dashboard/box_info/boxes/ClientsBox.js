import {DATA} from "../clients_data";
import ClientInfo from "../ClientInfo";
import React from "react";

export default function ArrivalsBox(props) {
    if (props.status === 0) {
        if (DATA[0].length === 0) {
            return (<p className={"empty_box"}>Увы, гостиница пуста =(</p>);
        }
        return DATA[0].map((item, index) =>
            <ClientInfo status={props.status} number={index}/>)
    }
}