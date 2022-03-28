import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
    return (
        <Card sx={{ maxWidth: 180 }} onClick={() => console.log(props.hotel)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.hotel.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.hotel.title}
                    </Typography>
                    <Typography variant="body5" color="text.secondary">
                        {props.hotel.number} {props.hotel.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
