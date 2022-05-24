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
import { message } from 'antd';
import { Card } from 'antd';
import { getstudents } from '../../Actions/StudentActions';
import SearchList from './SearchList';
import axios from 'axios';
import TimeLine from './TimeLine';
import Chart from './Chart';
function Wall({ group, uid }) {
    const [add, setadd] = useState(false)
    const [input, setinput] = useState("")
    const [memebers, setmemebers] = useState([])
    const [allstudents, setallstudents] = useState([])
    const [actualgroup, setactualgroup] = useState()
    const [topic, settopic] = useState(false)
    const [groupstage, setgroupstage] = useState()
    const { students } = useSelector(state => state.stu);
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
        axios.get(`http://localhost:8070/api/studentGroups/${group._id}`).then((data) => {
            setactualgroup(data.data)
        }).catch((err) => {
            console.log(err)
        })


        axios.get(`http://localhost:8070/api/stages/${group._id}`).then((data) => {
            setgroupstage(data.data)
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
        axios.get(`http://localhost:8070/user/getstudnets/${group._id}`).then((data) => {
            var users = data.data;
            memcount = users.length
            users = users.filter(f => f._id != uid)
            setmemebers(users)



        }).catch((err) => {
            console.log(err)
        })

    }, [memebers])



    const hanldechange = (e) => {
        e.preventDefault()
        setinput(e.target.value)

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
    return (
        <div className="container-fluid mt-5 mb-5">
            <div className="row no-gutters justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10 col-12 mb-4"><img src={"http://localhost:8070/" + group.image} className='img-fluid mx-auto d-block group_img' /></div>
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-12">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 toparea text-white">
                            <h3 className="display-5 topic">{group.groupName}</h3>
                        </div>
                        <div className="p-4 resarea text-white">
                            <h6 className='res_topic'>{group.topic}</h6>
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
                                        {actualgroup?.cosupervisor ? <><Conversation /></> : <>
                                            <h6>No Co-supervisor Allocated yet</h6>
                                        </>}
                                    </Card>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-8 col-10 mt-3 p-3  memberbox'>
                    <span className='ic'>{add ? (<i class="fa fa-times-circle closebox" onClick={(e) => { chnagebox() }} aria-hidden="true"></i>) : (<i class="fa fa-plus-circle addmember" onClick={(e) => { chnagebox() }} aria-hidden="true"></i>)}</span><h3 className='text-center'>{topic ? "Add Members" : "Team Members"}</h3>
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
        </div >

    );
}

export default Wall;