import React, {useState} from "react";
import {DATA} from './clients_data';

export default function ClientInfo(props) {
    const [status] = useState(props.status);
    const [number] = useState(props.number);

    return (
        <div className={"client_info"}>
            <p className={"client_name"}> {DATA[status][number].name}</p>
            <p className={"room_info"}> {DATA[status][number].category}, количество
                гостей: {DATA[status][number].peopleNumber}</p>
            <p className={"contact_info"}> Контактная
                информация: {DATA[status][number].phoneNumber}, {DATA[status][number].mail}</p>
        </div>
    )
}