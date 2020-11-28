import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import arrivals from "../../../resources/cards/home_plus.svg"
import arrivals_dark from "../../../resources/cards/home_plus_dark.svg"

import "./cards.css";
import theme from "./theme";
import {ThemeProvider} from "@material-ui/core";

export default function CardArrivals() {
    const [countArrivals] = useState(3);

    return (
        <ThemeProvider theme={theme}>
        <Card className={"card"} id={"card_arrivals"}>
            <CardActionArea>
                <img className={"image_card"} src={arrivals} alt={"Arrivals"}/>
                <img className={"image_card_dark"} src={arrivals_dark} alt={"Arrivals_dark"}/>

                <CardContent className={"card_info"} color={'black'}>
                    <Typography className={"text_card"} gutterBottom variant="h6" component="h2">
                        {countArrivals}
                    </Typography>
                    <Typography className={"text_card"} gutterBottom variant="body2" component="p">
                        Заезды
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </ThemeProvider>
    );
}