import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import departures from "../../../resources/cards/home_minus.svg"
import departures_dark from "../../../resources/cards/home_minus_dark.svg"
import "./cards.css"
import {DATA} from "../box_info/clients_data";

export default function CardDeparture(props) {
    const [countDepartures, setCountDepartures] = useState(DATA[2].length);
    useEffect(() => {
        setCountDepartures(DATA[2].length);
    })

    return (
        <Card className={"card"} id={"card_departure"}>
            <CardActionArea onClick={() => {
                props.updateStatus(2)
            }}>
                <img className={"image_card"} src={departures} alt={"Departures"}/>
                <img className={"image_card_dark"} src={departures_dark} alt={"Departures Dark"}/>

                <CardContent className={"card_info"}>
                    <Typography className={"text_card"} gutterBottom variant="h6" component="h2">
                        {countDepartures}
                    </Typography>
                    <Typography className={"text_card"} gutterBottom variant="body2" component="p">
                        Выезды
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}