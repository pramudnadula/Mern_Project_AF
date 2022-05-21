import React from 'react';
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { SendOutlined } from '@ant-design/icons';
import SendIcon from '@mui/icons-material/Send';


function Card1({ supervisor }) {
    const { Meta } = Card;
    return (

        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://www.looper.com/img/gallery/why-the-professor-from-money-heist-looks-so-familiar/intro-1587390568.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {supervisor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {supervisor.email}<br />
                        {supervisor.groups}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {supervisor.groups == 4 ? (
                    <Button variant="contained" disabled endIcon={<SendIcon />}>

                    </Button>
                ) : (
                    <Button variant="contained" endIcon={<SendIcon />}>

                    </Button>
                )}

            </CardActions>
        </Card>



    );
}

export default Card1;

