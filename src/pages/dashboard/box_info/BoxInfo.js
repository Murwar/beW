import React from "react";
import './box_info.css';
import ClientInfo from "./ClientInfo";
import useWindowWidth from "../../WindowWidth";
import {DATA} from "./clients_data";

function readAllClientData(status) {
    return DATA[status].map((value, index) =>
        <ClientInfo status={status} number={index}/>);
}

export default function BoxInfo(props) {

    return (
        <div className={"box_info"}
             style={{width: useWindowWidth() >= 1161 ? 920 : 645}
             }>

            {readAllClientData(props.status)}

        </div>

    )
}