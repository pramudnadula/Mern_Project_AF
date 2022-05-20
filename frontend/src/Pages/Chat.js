import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import '../Assets/Styles/chat.css'
//import Chatonline from './Chatonline';
import Conversations from '../Components/GroupManagement/Conversations';
import Message from '../Components/GroupManagement/Message';
import { io, Socket } from 'socket.io-client';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

function Chat(props) {
    const [conversations, setConversations] = useState([])
    const [currentchat, setcurrentchat] = useState(null)
    const [messages, setmessages] = useState([])
    const [newmessage, setnewmessage] = useState('')
    const [arrivalmsg, setarrivalmsg] = useState('')
    const [onlineusers, setonlineusers] = useState([])
    const [input, setinput] = useState("")
    const socket = useRef()

    const scrollRef = useRef()
    // const user = JSON.parse(localStorage.getItem("user"))
    const user = {
        _id: "626c3d7400515963c30d7f2b"
    }


    useEffect(() => {

        socket.current = io("ws://localhost:8900");
        socket.current.on("getmsg", data => {
            setarrivalmsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [])

    const hanldechange = (e) => {
        e.preventDefault()
        setinput(e.target.value)

    }

    const filteredData = conversations.filter((el) => {
        //if no input the return the original
        if (input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.receiver.toLowerCase().includes(input)
        }
    })

    const searchbar = () => {
        return (
            <Paper

                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search chats"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={hanldechange}
                    value={input}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            </Paper>
        )
    }


    useEffect(() => {
        arrivalmsg && currentchat?.members.includes(arrivalmsg.sender) && setmessages((prev) => [...prev, arrivalmsg])
    }, [arrivalmsg, currentchat])

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        // socket.current.on("getusers", (users) => {
        //     setonlineusers(users);
        // })

    }, [user])






    useEffect(() => {
        const getcon = async () => {
            try {
                const res = await axios.get("http://localhost:8070/api/conversation/" + user._id)
                setConversations(res.data)


            } catch (error) {
                console.log(error)
            }

        }
        getcon()
    }, [user])
    useEffect(() => {
        const getmessages = async () => {
            try {
                const res = await axios.get('http://localhost:8070/api/message/' + currentchat?._id)
                setmessages(res.data)
            } catch (error) {
                console.log(error)
            }

        }
        getmessages()
    }, [currentchat])

    const hanldesumbit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newmessage,
            conversationId: currentchat._id,
        }
        const recieverId = currentchat.members.find(member => member !== user._id)
        socket.current.emit("sendmsg", {
            senderId: user._id,
            recieverId,
            text: newmessage,
        })
        try {
            const res = await axios.post('http://localhost:8070/api/message', message);
            setmessages([...messages, res.data])
            setnewmessage("")

        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className='messanger'>
            <div className='chatmenu'>
                <div className='cmwrapper'>
                    {searchbar()}
                    {filteredData.map((c) => (
                        <div onClick={(e) => setcurrentchat(c)}>
                            <Conversations conversation={c} curentuserid={user._id} />
                        </div>

                    ))}

                </div>
            </div>
            <div className='chatbox'>
                <div className='cbwrapper'>
                    {currentchat ? <>
                        <div className='chatboxtop'>
                            {messages.map(m => (
                                <div ref={scrollRef}>
                                    <Message message={m} own={m.sender === user._id} />
                                </div>

                            ))}


                        </div>
                        <div className='chatboxbottom'>
                            <textarea
                                onChange={(e) => setnewmessage(e.target.value)}
                                value={newmessage}
                                placeholder='write something' className='msgwrite'></textarea>
                            <button className='chatsend' onClick={hanldesumbit}>send</button>

                        </div></> : <span className='nocon'>Open a conversation to start a chat</span>}
                </div>
            </div>

            <div className='chatOnline'>
                <div className='cowrapper'>
                    {/* <Chatonline onlineusers={onlineusers} cuserid={user._id} setcurrentchat={setcurrentchat} /> */}
                </div>
            </div>


        </div>
    );
}

export default Chat;