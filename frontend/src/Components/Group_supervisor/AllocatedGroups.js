import { Badge, Button, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../Assets/Styles/sup.css'
import Chart from '../GroupManagement/Chart';
import TimeLine from '../GroupManagement/TimeLine';
import { Result } from 'antd';
import { GET, POST, DELETE, PUT } from '../../Helper/httpHelper'
function AllocatedGroups(props) {
    const [groups, setgroups] = useState([])
    const [req, setreq] = useState([])
    const [onereq, setonereq] = useState()
    const [show, setshow] = useState(false)
    const [show2, setshow2] = useState(false)
    const [show3, setshow3] = useState(false)
    const [stage, setstage] = useState()
    const sid = localStorage.getItem("staff")
    let type = localStorage.getItem("type")
    const token = localStorage.getItem("token");

    if (type == "true") {
        type = true
    } else {
        type = false
    }

    useEffect(() => {

        GET(`api/studentGroups/groups/${sid}`).then((data) => {
            setgroups(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    useEffect(() => {
        const ob = {
            type
        }
        axios.post(`http://localhost:8070/api/trequest/checkbyuser/${sid}`, ob).then((data) => {
            setreq(data.data)
            console.log(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [req])

    const displayreq = (id) => {
        const sreq = req.filter(f => f.group == id)
        setonereq(sreq[0])
        setshow2(false)
        setshow3(false)
        setshow(true)
    }
    const checkcount = (id) => {
        const sreq = req.filter(f => f.group == id)
        return sreq.length
    }

    const responsetoRequest = async (stat, rid, tid) => {
        const ob = {
            stat,
            type,
            rid,
            tid
        }
        try {
            const res = await axios.post(`http://localhost:8070/api/trequest/response`, ob)
            message.success("success")
            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }

    }

    const displaymilestones = async (id) => {
        try {
            const res = await GET(`api/studentGroups/groupstage/${id}`)

            setstage(res)
            setshow(false)
            setshow3(false)
            setshow2(true)


        } catch (err) {
            console.log(err)
        }
    }

    const displaychart = () => {
        setshow(false)
        setshow2(false)
        setshow3(true)
    }

    const diplayInfo = () => {
        message.info("No Topic Registration Requests")
        setshow2(false)
        setshow3(false)
    }

    const fun = async () => {
        const ob = {
            name: "new"
        }
        try {
            const res = await POST(`api/researchareas/create`, ob)
            if (res) {
                alert("aded")
            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className={groups.length > 0 ? "col-7" : "col-12"}>
                    <div className='row justify-content-center'>
                        {groups.length > 0 ? <>

                            {groups?.map((m, i) => (

                                <div className="card col-10 group_card mt-3">
                                    <div className="card-body">
                                        <div className='row  align-items-center'>
                                            <div className='col-5'>
                                                <h5 className="card-title">{m?.groupName}</h5>
                                                <p className="card-text">{m.topic ? m.topic : "Topic Not Yet Allocated"}</p>
                                                {m.area ? <>
                                                    <span className="badge bg-success">{m.area.name}</span>
                                                </> : <>
                                                    <span className="badge bg-warning">Research area Not Disided</span>
                                                </>}

                                            </div>

                                            <div className='col-2'>

                                                {checkcount(m._id) > 0 ? <>
                                                    <Badge count={checkcount(m._id)}>
                                                        <button onClick={(e) => { displayreq(m._id) }} className="btn btn-success"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                                                    </Badge>
                                                </> : <>
                                                    <button onClick={(e) => { diplayInfo() }} className="btn btn-success"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                                                </>}
                                            </div>
                                            <div className='col-2'><button onClick={(e) => { displaymilestones(m._id) }} className="btn btn-warning m-2"><i className="fa fa-trophy"></i></button></div>
                                            <div className='col-2'><button onClick={(e) => { displaychart() }} className="btn btn-info m-2"><i className="fa fa-line-chart" aria-hidden="true"></i></button></div>
                                        </div>
                                    </div>
                                </div>



                            ))}
                        </> : <>
                            <div className='col-10'>
                                <Result
                                    status="404"
                                    title="No Groups Allocated Yet"
                                    subTitle="Please check the Bell icon for any Group request."
                                // extra={<Button type="primary">Back Home</Button>}
                                />
                            </div>

                        </>}

                    </div>
                </div>
                <div className='col-5'>
                    <div className='row justify-content-center'>
                        {show ? <>
                            <h2>Topic Selection Request</h2>

                            <div className='col-10 req_col'>
                                <div className='row'>
                                    <div className='col-12'>
                                        Topic Name : {onereq?.topic.name}
                                    </div>
                                    <div className='col-12'>
                                        Researcharea : {onereq?.topic.rname}
                                    </div>
                                    <div className='col-12'>
                                        Supervisor State : {onereq?.topic.sview ? <>
                                            {onereq?.topic.sstat ? <><span className='badge bg-success'>Approved</span></> : <><span className='badge bg-danger'>Rejected</span></>}
                                        </> : <>

                                            <span className='badge bg-warning'>Not Viewed yet</span>
                                        </>}
                                    </div>

                                    <div className='col-12'>
                                        Co-Supervisor State : {onereq?.topic.cview ? <>
                                            {onereq?.topic.cstat ? <><span className='badge bg-success'>Approved</span></> : <><span className='badge bg-danger'>Rejected</span></>}
                                        </> : <>

                                            <span className='badge bg-warning'>Not Viewed yet</span>
                                        </>}
                                    </div>
                                    <div className='col-12'>
                                        <h4>Links</h4>
                                    </div>
                                    {onereq?.topic.links.map((m, i) => (
                                        <div className='col-12 mb-4' key={i}>
                                            <a href={m} target='_blank' className="link_div p-2">{m}</a>
                                        </div>
                                    ))}

                                    {type ? <>
                                        {onereq.topic.sview ? <></> : <>

                                            <div className='col-12'>
                                                <div className='row justify-content-center'>
                                                    <div className='col-3'>
                                                        <a className='btn btn-success' onClick={(e) => { responsetoRequest(true, onereq._id, onereq.topic._id) }}>Approve</a>
                                                    </div>
                                                    <div className='col-1'></div>
                                                    <div className='col-3'>
                                                        <a className='btn btn-danger' onClick={(e) => { responsetoRequest(false, onereq._id, onereq.topic._id) }}>Reject</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </>}
                                    </> : <>
                                        {onereq.topic.cview ? <>

                                        </> : <>
                                            <div className='col-12'>
                                                <div className='row justify-content-center'>
                                                    <div className='col-3'>
                                                        <a className='btn btn-success' onClick={(e) => { responsetoRequest(true, onereq._id, onereq.topic._id) }}>Approve</a>
                                                    </div>
                                                    <div className='col-1'></div>
                                                    <div className='col-3'>
                                                        <a className='btn btn-danger' onClick={(e) => { responsetoRequest(false, onereq._id, onereq.topic._id) }}>Reject</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </>}
                                    </>}


                                </div>

                            </div>
                        </> : <></>}


                        {show2 ? <>
                            <div className='col-12'>

                                <TimeLine stage={stage} />
                            </div>

                        </> : <></>}

                        {show3 ? <>
                            <Chart />
                        </> : <></>}


                    </div>
                </div>
            </div>
            <button onClick={(e) => { fun() }}>sss</button>
        </div>
    );
}

export default AllocatedGroups;