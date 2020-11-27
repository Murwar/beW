import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import arrivals from "../../../resources/cards/home_plus.svg"
import "./cards.css"

export default function CardArrivals() {
    const [countArrivals] = useState(3);

    return (
        <Card className={"card"} id={"card_arrivals"}>
            <CardActionArea>
                <img className={"image_card"} src={arrivals} alt={"Arrivals"}/>
                <CardContent className={"card_info"}>
                    <Typography className={"text_card"} gutterBottom variant="h6" component="h2">
                        {countArrivals}
                    </Typography>
                    <Typography className={"text_card"} gutterBottom variant="body2" component="p">
                        Заезды
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}