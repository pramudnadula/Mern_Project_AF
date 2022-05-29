import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../Assets/Styles/studentGroup.css';
import defwall from '../../Assets/Images/no.jpg';
import Conversation from './Conversation';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { message, Modal } from 'antd';
import { Card } from 'antd';
import { getstudents } from '../../Actions/StudentActions';
import SearchList from './SearchList';
import axios from 'axios';
import TimeLine from './TimeLine';
import { Select } from 'antd';
const { Option } = Select;
import Chart from './Chart';
import { GET, POST } from '../../Helper/httpHelper';
function Wall({ group, uid }) {
    const [add, setadd] = useState(false)
    const [input, setinput] = useState("")
    const [memebers, setmemebers] = useState([])
    const [allstudents, setallstudents] = useState([])
    const [actualgroup, setactualgroup] = useState()
    const [topic, settopic] = useState(false)
    const [groupstage, setgroupstage] = useState()
    const [areas, setareas] = useState([])
    const [aid, setaid] = useState()
    const [links, setlinks] = useState([])
    const [name, setname] = useState('')

    const { students } = useSelector(state => state.stu);
    const [modal3, setModal3Visible] = useState(false)
    const dispatch = useDispatch()
    const chnagebox = (e) => {
        if ((memebers.length === 3) && (!add)) {
            message.error("Already have 4 members")
            return;
        }
        setadd(!add);
        settopic(!topic)

    }
    useEffect(() => {
        GET(`api/studentGroups/${group._id}`).then((data) => {
            setactualgroup(data)
        }).catch((err) => {
            console.log(err)
        })


        GET(`api/stages/${group._id}`).then((data) => {
            setgroupstage(data)
        }).catch((err) => {
            console.log(err)
        })

        GET(`api/researchareas/list`).then((data) => {
            setareas(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        dispatch(getstudents())
    }, [students])
    var memcount = 0;
    useEffect(() => {
        dispatch(getstudents())
        GET(`user/getstudnets/${group._id}`).then((data) => {
            var users = data;
            memcount = users.length
            users = users.filter(f => f._id != uid)
            setmemebers(users)



        }).catch((err) => {
            console.log(err)
        })

    }, [memebers])

    const sendRequesttopic = async (e) => {
        e.preventDefault()


        let ob = {
            gid: group._id,
            sid: actualgroup.supervisor._id,
            cid: actualgroup.cosupervisor._id,
            name: name,
            areas: aid,
            links

        }
        POST(`api/trequest`, ob).then((data) => {
            message.success("Request send Successfully")
        }).catch((err) => {
            console.log(err)
        })
        window.location.reload(false)

    }

    const hanldechange = (e) => {
        e.preventDefault()
        setinput(e.target.value)

    }

    const getTrequest = () => {
        GET(`api/trequest/getone/${group._id}`).then((data) => {

        }).catch((err) => {
            console.log(err)
        })
    }

    let ss = []
    const addlink = () => {
        let link = document.getElementById("link").value
        if (link === "") {
            return message.warning("Please Enter a Link")
        }
        ss = [...links]
        ss.push(link)
        setlinks(ss)
        document.getElementById("link").value = ""
        message.success((links.length + 1) + " Link Added to list")
        console.log(ss)

    }
    const setmodal = async () => {
        try {
            if (!group.supervisor) {
                message.warning("No supervisor Allocated Yet")
                return
            }
            else if (!group.cosupervisor) {
                message.warning("No Co-supervisor Allocated Yet")
                return
            }
            const re = await GET(`api/trequest/check/${group._id}`)
            if (re) {
                message.warning("You have send a Request Already")
                return
            }
            else {
                setModal3Visible(true)
            }
        } catch (err) {
            console.log(err)
        }

    }
    const searchbar = () => {
        return (
            <Paper

                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for member"
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

    const removeLink = (index) => {
        const arr = []
        for (var i = 0; i < links.length; i++) {
            if (!(i == index)) {
                arr.push(links[i])
            }
        }
        setlinks(arr)

    }
    return (
        <div className="container-fluid mt-5 mb-5">
            <div className="row no-gutters justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10 col-12 mb-4"><img src={group.image ? "http://localhost:8070/" + group.image : defwall} className='img-fluid mx-auto d-block group_img' /></div>
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-12">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 toparea text-white">
                            <h3 className="display-5 topic">{group.groupName}</h3>
                        </div>
                        <div className="p-4 resarea text-white">
                            <h6 className='res_topic'>{(group.topic) ? <>{group.topic}</> : <><button className='btn btn-warning' onClick={(e) => { setmodal() }}>Register Topic</button></>}</h6>
                        </div>

                    </div>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-xl-8 col-lg-8 col-md-10 col-sm-12 col-12 mt-3'>
                    <div className='row justify-content-center'>
                        <div className='col-11 supervisor'>
                            <h3 className='text-center mt-2'>Supervisors</h3>
                            <div className='row justify-content-center pb-4'>
                                <div className='col-xl-5 col-lg-5 col-md-5 col-sm-8 col-10'>

                                    <Card title="Supervisor" className='sup_crad mb-3' bordered={false}>

                                        {actualgroup?.supervisor ? <><Conversation user={actualgroup.supervisor} send={false} /></> : <>
                                            <h6>No supervisor Allocated yet</h6>
                                        </>}

                                    </Card>
                                </div>
                                <div className='col-xl-5 col-lg-5 col-md-5 col-sm-8 col-10'>
                                    <Card title="Co-Supervisor" className='sup_crad' bordered={false}>
                                        {actualgroup?.cosupervisor ? <><Conversation user={actualgroup.cosupervisor} send={false} /></> : <>
                                            <h6>No Co-supervisor Allocated yet</h6>
                                        </>}
                                    </Card>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-8 col-10 mt-3 p-3  memberbox'>
                    <span className='ic'>{add ? (<i className="fa fa-times-circle closebox" onClick={(e) => { chnagebox() }} aria-hidden="true"></i>) : (<i className="fa fa-plus-circle addmember" onClick={(e) => { chnagebox() }} aria-hidden="true"></i>)}</span><h3 className='text-center'>{topic ? "Add Members" : "Team Members"}</h3>
                    {add ? (<>
                        {searchbar()}
                        {/* <div className='resbox mt-3'>
                            {students.map((stu, i) => (
                                <Conversations />

                            ))}

                        </div> */}
                        <div className='resbox mt-3'>
                            <SearchList datas={students} inp={input} gid={group._id} />
                        </div>
                    </>


                    ) : (<>
                        {memebers?.map((m, i) => (
                            <Conversation user={m} send={false} />
                        ))}
                    </>)}
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-xl-5 col-lg-5 col-md-8 col-sm-10 col-12'>
                    <h2 className='text-center'>Research Milestones</h2>
                    <TimeLine stage={groupstage} />
                </div>
                <div className='col-7 mt-5'>
                    <Chart />
                </div>
            </div>

            <Modal

                style={{
                    top: 20,
                }}
                visible={modal3}
                onOk={() => setModal3Visible(false)}
                onCancel={() => setModal3Visible(false)}
                footer={null}
            >
                <div className='row justify-content-center'>
                    <h2 className='text-center'>Topic Registration</h2>
                    <div className='col-10'>
                        <form className='req_form p-4' onSubmit={sendRequesttopic}>
                            <label>Select your Research Area</label><br /><br />

                            <select required onChange={(e) => { setaid(e.target.value) }}>
                                <option>Select one</option>
                                {areas?.map((m, i) => (
                                    <option key={i} value={m._id}>{m?.name}</option>
                                ))}
                            </select><br /><br />
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Topic Name</span>
                                </div>
                                <input type="text" onChange={(e) => { setname(e.target.value) }} required className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />

                            </div>

                            <div className="input-group mb-3">
                                <input type="text" id='link' className="form-control" placeholder="Add a Link" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button type='button' onClick={(e) => { addlink() }} className="btn "><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
                                </div>
                            </div>

                            <h2 className='text-center'> <input type='submit' className='btn btn-warning' value="Send Request" /></h2>

                        </form>

                    </div>
                    <div className='col-10'>
                        <table className='table table-hover'>
                            <tr>
                                <th>No</th>
                                <th>Link</th>
                                <th></th>
                                <th></th>

                            </tr>
                            <tbody>
                                {links?.map((m, i) => (
                                    <tr key={i}>
                                        <td>{(i + 1)}</td>
                                        <td><a href={m}>{m}</a></td>
                                        <td colSpan="2"><i class="fa fa-times-circle-o" aria-hidden="true" style={{ color: "red", cursor: "pointer" }} onClick={(e) => { removeLink(i) }}></i></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal >
        </div >

    );
}

export default Wall;