import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import departures from "../../../resources/cards/home_minus.svg"
import departures_dark from "../../../resources/cards/home_minus_dark.svg"
import "./cards.css"
import {DATA} from "../box_info/clients_data";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function CardDeparture(props) {
    const [countDepartures, setCountDepartures] = useState(DATA[2].length);
    useEffect(() => {
        setCountDepartures(DATA[2].length);
    })
    const useStyles = makeStyles(({
        selected: {
            backgroundColor: "rgba(33,150,243,0.44)",
            color: "#2E3A59"
        }
    }));

    const classes = useStyles();

    return (
        <Card className={"card"} id={"card_departure"}>
            <CardActionArea className={props.status === 2 ? classes.selected : {}} onClick={() => {
                props.updateStatus(2)
            }}>
                {props.status === 2 ?
                    <img className={"image_card_dark"} src={departures_dark} alt={"Departures Dark"}/>
                    :
                    <img className={"image_card"} src={departures} alt={"Departures"}/>
                }

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