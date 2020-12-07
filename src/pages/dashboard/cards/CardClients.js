import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import people from "../../../resources/cards/user.svg"
import people_dark from "../../../resources/cards/user_dark.svg"
import "./cards.css"
import {DATA} from "../box_info/clients_data";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function CardClients(props) {
    const [countClients, setCountClients] = useState(DATA[0].length);
    useEffect(() => {
        setCountClients(DATA[0].length);
    })
    const useStyles = makeStyles(({
        selected: {
            backgroundColor: "rgba(33,150,243,0.44)",
            color: "#2E3A59"
        }
    }));

    const classes = useStyles();

    return (
        <Card className={"card"} id={"card_clients"}>
            <CardActionArea className={props.status === 0 ? classes.selected : {}} onClick={() => {
                props.updateStatus(0)
            }}>
                {props.status === 0 ?
                    <img className={"image_card_dark"} src={people_dark} alt={"People Dark"}/>
                    :
                    <img className={"image_card"} src={people} alt={"People"}/>
                }

                <CardContent className={"card_info"}>
                    <Typography className={"text_card"} gutterBottom variant="h6" component="h2">
                        {countClients}
                    </Typography>
                    <Typography className={"text_card"} gutterBottom variant="body2" component="p">
                        Гости
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}