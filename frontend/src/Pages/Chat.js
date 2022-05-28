import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import '../Assets/Styles/chat.css'
//import Chatonline from './Chatonline';
import Conversations from '../Components/GroupManagement/Conversations';
import Message from '../Components/GroupManagement/Message';
import { io, Socket } from 'socket.io-client';
import Paper from '@mui/material/Paper';
import { TextLoop } from 'react-text-loop-next';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Conversation from '../Components/GroupManagement/Conversation';
import { Alert } from 'antd';
import { GET, POST } from '../Helper/httpHelper';

function Chat(props) {
    const [conversations, setConversations] = useState([])
    const [sconversations, setsConversations] = useState([])
    const [gconversation, setgconversation] = useState()
    const [currentchat, setcurrentchat] = useState(null)
    const [messages, setmessages] = useState([])
    const [newmessage, setnewmessage] = useState('')
    const [arrivalmsg, setarrivalmsg] = useState('')
    const [onlineusers, setonlineusers] = useState([])
    const [members, setmembers] = useState([])
    const [supergroups, setsupergroups] = useState([])
    const [input, setinput] = useState("")
    const socket = useRef()

    const scrollRef = useRef()
    let ind = false;
    if (localStorage.getItem("user")) {
        ind = true;
    }
    let ngid;
    const userid = localStorage.getItem("user") || localStorage.getItem("staff")
    const [gid, setgid] = useState()
    if (ind) {
        ngid = localStorage.getItem("gid")
    }

    let user = {
        _id: userid
    }
    useEffect(() => {
        GET(`user/getstudnets/${gid}`).then((data) => {
            var users = data;
            users = users.filter(f => f._id != userid)
            setmembers(users)



        }).catch((err) => {
            console.log(err)
        })
        if (!ind) {
            GET(`api/studentGroups/groups/${userid}`).then((data) => {
                setsupergroups(data)
            }).catch((err) => {
                console.log(err)
            })
        }

    }, [])


    useEffect(() => {

        socket.current = io("ws://localhost:8900");
        socket.current.on("getmsg", data => {
            setarrivalmsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, [gid])

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

    const handlec = (id) => {
        setgid(id)
        console.log(id)
        get
    }

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

    const dropdown = () => {
        return (
            <>
                <select onChange={(e) => { handlec(e.target.value) }}>
                    <option >select group</option>
                    {supergroups?.map((ma, i) => (
                        <option value={ma._id}>{ma.groupName}</option>
                    ))}

                </select>
            </>
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
            if (ind) {
                try {
                    const res = await GET("api/conversation/" + user._id)
                    setConversations(res)


                } catch (error) {
                    console.log(error)
                }
            } else if (gid) {
                try {
                    const ob = {
                        uid: user._id,
                        gid
                    }
                    const res = await POST("api/conversation/group", ob)
                    console.log(res)
                    setConversations(res)


                } catch (error) {
                    console.log(error)
                }
            }

            if (ind && ngid) {
                try {
                    const res = await GET("api/conversation/" + ngid)

                    setgconversation(res)



                } catch (error) {
                    console.log(error)
                }
            }



        }
        getcon()
    }, [gid])
    useEffect(() => {
        const getmessages = async () => {
            try {
                const res = await GET('api/message/' + currentchat?._id)
                setmessages(res)
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
            const res = await POST('api/message', message);
            setmessages([...messages, res])
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
                    {/* {searchbar()} */}
                    {ind ? <>

                    </> : <>
                        {dropdown()}
                    </>}
                    {filteredData.map((c) => (
                        <div onClick={(e) => setcurrentchat(c)}>
                            <Conversations conversation={c} curentuserid={user._id} type={c.type} ind={ind} />
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

                        </div></> : <Alert
                        banner
                        type='success'
                        message={
                            <TextLoop mask>
                                <div>Select conversation for chat</div>
                                <div>Dont have conversations ?</div>
                                <div>Then joined a group</div>
                                <div>Select conversation for chat</div>
                            </TextLoop>
                        }
                    />}
                </div>
            </div>

            <div className='chatOnline'>
                <div className='cowrapper'>


                </div>
            </div>


        </div>
    );
}

export default Chat;