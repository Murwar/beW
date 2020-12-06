import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import cancel from "../../../resources/cards/off_outline_close.svg"
import cancel_dark from "../../../resources/cards/off_outline_close_dark.svg"
import "./cards.css"

export default function CardCancel(props) {
    const [countCancel] = useState(0);

    return (
        <Card className={"card"} id={"card_cancels"}>
            <CardActionArea onClick={() => { props.updateStatus(3)}}>
                <img className={"image_card"} src={cancel} alt={"Cancels"}/>
                <img className={"image_card_dark"} src={cancel_dark} alt={"Cancels Dark"}/>

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