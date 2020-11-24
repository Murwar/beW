import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import people from "../../resources/cards/user.svg"
import "./CardClients.css"

export default function CardClients() {
    const [countClients] = useState(41);

    return (
        <Card className={"card_clients"}>
            <CardActionArea>
                <img className={"image_card"} src={people} alt={"People"}/>
                <CardContent className={"card_info"}>
                    <Typography className={"text_card"} gutterBottom variant="h6" component="h2">
                        {countClients}
                    </Typography>
                    <Typography className={"text_card"} gutterBottom variant="body2"  component="p">
                        Постояльцы
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}