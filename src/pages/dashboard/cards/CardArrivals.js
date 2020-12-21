import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import arrivals from "../../../resources/cards/home_plus.svg"
import arrivals_dark from "../../../resources/cards/home_plus_dark.svg"

import "./cards.css";
import theme from "./theme";
import {ThemeProvider} from "@material-ui/core";
import {DATA} from "../box_info/clients_data";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function CardArrivals(props) {
    const [countArrivals, setCountArrivals] = useState(DATA[1].length);
    useEffect(() => {
        setCountArrivals(DATA[1].length);
    })

    const useStyles = makeStyles(({
        selected: {
            backgroundColor: "rgba(33,150,243,0.44)",
            color: "#2E3A59"
        }
    }));

    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Card className={"card"} id={"card_arrivals"}>
                <CardActionArea className={props.status === 1 ? classes.selected : {}} onClick={() => {
                    props.updateStatus(1);
                }}>
                    {props.status === 1 ?
                        <img className="image_card_dark"
                             src={arrivals_dark} alt={"arrivals_dark"}/>
                        :
                        <img className={"image_card"} src={arrivals} alt={"Arrivals"}/>
                    }

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