import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { SendOutlined } from '@ant-design/icons';
import SendIcon from '@mui/icons-material/Send';
import { message } from 'antd';
import defpic from '../../Assets/Images/user1.png'
import axios from 'axios';
import { GET, POST } from '../../Helper/httpHelper'
const gid = localStorage.getItem("gid")

function Card1({ supervisor, type, group }) {
    const { Meta } = Card;


    const sendrequest = async (id) => {
        try {
            if (group?.members < 4) {
                message.warning("Must Have 4 members in the Group")
                return;
            }

            if (type) {
                if (group?.supervisor) {
                    message.warning("Already have a Supervisor")

                    return
                }
            } else {

                if (group?.cosupervisor) {
                    message.warning("Already have a Co-Supervisor")
                    return
                }
            }
            const reqob = {
                gid,
                reciever: id
            }
            const res = await POST('api/request/checkexist', reqob)
            let exsist = res.st
            if (exsist) {
                message.warning("You Already Send an Request")
                return
            }

            const ob = {
                group: gid,
                reciever: id
            }
            POST('api/request/', ob).then((data) => {
                message.success("Request Send")
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }



    }
    return (

        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={supervisor.image ? ("http://localhost:8070/" + supervisor.image) : defpic}
                    alt="staff Image"
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {supervisor?.fname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {supervisor.email}<br />
                        {supervisor.groups}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {(localStorage.getItem("staff")) ? <>
                </> : <>


                    {(supervisor.groups == 4) ? (
                        <Button variant="contained" onClick={(e) => { sendrequest(supervisor._id) }} disabled endIcon={<SendIcon />}>

                        </Button>
                    ) : (
                        <Button variant="contained" onClick={(e) => { sendrequest(supervisor._id) }} endIcon={<SendIcon />}>

                        </Button>
                    )}
                </>}



            </CardActions>
        </Card>



    );
}

export default Card1;

