import {DATA} from "../clients_data";
import ClientInfo from "../ClientInfo";
import React from "react";
import cat from "../../../../resources/box_dashboard_images/cat.png"
import '../box_info.css'

export default function CancelBox(props) {
    if (props.status === 3) {
        if (DATA[3].length === 0) {
            return ([<img src={cat} className={"box_cat"} alt={"kitty"}/>, <p className={"empty_box"}>Отмен нет =)</p>]
            );
        }
        return DATA[3].map((item, index) =>
            <ClientInfo status={props.status} number={index}/>)
    }
}