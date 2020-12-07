import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import cancel from "../../../resources/cards/off_outline_close.svg"
import cancel_dark from "../../../resources/cards/off_outline_close_dark.svg"
import "./cards.css"
import {DATA} from "../box_info/clients_data";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function CardCancel(props) {
    const [countCancel, setCountCancel] = useState(DATA[3].length);
    useEffect(() => {
        setCountCancel(DATA[3].length);
    })

     const useStyles = makeStyles(({
        selected: {
            backgroundColor: "rgba(33,150,243,0.44)",
            color: "#2E3A59"
        }
    }));


    const classes = useStyles();

    return (
        <Card className={"card"} id={"card_cancels"}>
            <CardActionArea className={props.status === 3 ? classes.selected : {}} onClick={() => {
                props.updateStatus(3)
            }}>
                {props.status === 3 ?
                    <img className={"image_card_dark"} src={cancel_dark} alt={"Cancels Dark"}/>
                    :
                    <img className={"image_card"} src={cancel} alt={"Cancels"}/>
                }

                <CardContent className={"card_info"}>
                    <Typography className={"text_card"} gutterBottom variant="h6" component="h2">
                        {countCancel}
                    </Typography>
                    <Typography className={"text_card"} gutterBottom variant="body2" component="p">
                        Отмены
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}