import { Badge, Button, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../Assets/Styles/sup.css'
import Chart from '../GroupManagement/Chart';
import TimeLine from '../GroupManagement/TimeLine';
import { Result } from 'antd';
import { GET, POST, DELETE, PUT } from '../../Helper/httpHelper'
import DetailsCard from '../GroupManagement/DetailsCard';
function AllocatedGroups(props) {
    const [groups, setgroups] = useState([])
    const [students, setstudents] = useState([])
    const [req, setreq] = useState([])
    const [onereq, setonereq] = useState()
    const [show, setshow] = useState(false)
    const [show2, setshow2] = useState(false)
    const [show3, setshow3] = useState(false)
    const [show4, setshow4] = useState(false)
    const [stage, setstage] = useState()
    const [group, setgroup] = useState()
    const [grid, setgrid] = useState("")
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
        POST(`api/trequest/checkbyuser/${sid}`, ob).then((data) => {
            setreq(data)

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
            const res = await POST(`api/trequest/response`, ob)
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
            setshow2(false)
            setshow3(false)
            setshow2(true)



        } catch (err) {
            console.log(err)
        }
    }

    const displaychart = (id) => {
        setgrid(id)
        setshow(false)
        setshow2(false)
        setshow4(false)
        setshow3(true)
    }

    const diplayInfo = () => {
        message.info("No Topic Registration Requests")
        setshow2(false)
        setshow3(false)
        setshow4(false)
    }

    const deisplayDetails = async (id, gr) => {
        try {
            const student = await GET(`user/getstudnets/${id}`)
            setstudents(student)
            setgroup(gr)
            setshow2(false)
            setshow3(false)
            setshow4(true)
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className={groups.length > 0 ? "col-xl-7 col-lg-7 col-md-8 col-sm-10 col-12 mb-4" : "col-12"}>
                    <div className='row justify-content-center'>
                        {groups.length > 0 ? <>

                            {groups?.map((m, i) => (

                                <div className="card col-11 group_card mt-3">
                                    <div className="card-body">
                                        <div className='row  align-items-center'>
                                            <div className='col-12 mb-2'>
                                                <h5 className="card-title">{m?.groupName}</h5>
                                                <p className="card-text">{m.topic ? m.topic : "Topic Not Yet Allocated"}</p>
                                                {m.area ? <>
                                                    <span className="badge bg-success">{m.area.name}</span>
                                                </> : <>
                                                    <span className="badge bg-warning">Research area Not Disided</span>
                                                </>}

                                            </div>

                                            <div className='col-x1-1 col-lg-1 col-md-2 col-2 m-1 m-md-2 m-sm-2'>

                                                {checkcount(m._id) > 0 ? <>
                                                    <Badge count={checkcount(m._id)}>
                                                        <button onClick={(e) => { displayreq(m._id) }} className="btn btn-success"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                                                    </Badge>
                                                </> : <>
                                                    <button onClick={(e) => { diplayInfo() }} className="btn btn-success"><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                                                </>}
                                            </div>
                                            <div className='col-x1-1 col-lg-1 col-md-2 col-2 m-1 m-md-2 m-sm-2'><button onClick={(e) => { displaymilestones(m._id) }} className="btn btn-warning "><i className="fa fa-trophy"></i></button></div>

                                            <div className='col-x1-1 col-lg-1 col-md-2 col-2 m-1 m-md-2 m-sm-2'><button onClick={(e) => { displaychart(m._id) }} className="btn btn-info "><i className="fa fa-line-chart" aria-hidden="true"></i></button></div>
                                            <div className='col-x1-1 col-lg-1 col-md-2 col-2 m-1 m-md-2 m-sm-2'><button onClick={(e) => { deisplayDetails(m._id, m) }} className="btn btn-secondary "><i class="fa fa-info-circle" aria-hidden="true"></i></button></div>

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
                <div className='col-xl-5 col-lg-5 col-md-7 col-sm-10 col-12 mt-4'>
                    <div className='row justify-content-center'>
                        {show ? <>
                            <h2 className='text-center mt-3'>Topic Selection Request</h2>

                            <div className='col-11 req_col p-5'>
                                <div className='row'>
                                    <div className='col-12 mb-2' >
                                        Topic Name :<span style={{ fontWeight: "bold" }}> {onereq?.topic.name}</span>
                                    </div>
                                    <div className='col-12 mb-2' >
                                        Researcharea : <span style={{ fontWeight: "bold" }}>{onereq?.topic.rname}</span>
                                    </div>
                                    <div className='col-12 mb-3'>
                                        Supervisor State : {onereq?.topic.sview ? <>
                                            {onereq?.topic.sstat ? <><span className='badge bg-success'>Approved</span></> : <><span className='badge bg-danger'>Rejected</span></>}
                                        </> : <>

                                            <span className='badge bg-warning'>Not Viewed yet</span>
                                        </>}
                                    </div>

                                    <div className='col-12 mb-3'>
                                        Co-Supervisor State : {onereq?.topic.cview ? <>
                                            {onereq?.topic.cstat ? <><span className='badge bg-success'>Approved</span></> : <><span className='badge bg-danger'>Rejected</span></>}
                                        </> : <>

                                            <span className='badge bg-warning'>Not Viewed yet</span>
                                        </>}
                                    </div>

                                    <table className='table table-hover bg-light'>
                                        <tr>
                                            <th>No</th>
                                            <th>Link</th>

                                        </tr>
                                        <tbody>


                                            {onereq?.topic.links.map((m, i) => (
                                                <tr className='mb-4' key={i}>
                                                    <td>{(i + 1)}</td>
                                                    <td><a href={m} target='_blank' className="p-2">{m}</a></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

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
                                <h3 className='text-center'>Group Milestones</h3>
                                <TimeLine stage={stage} />
                            </div>

                        </> : <></>}

                        {show3 ? <>
                            <h3 className='text-center'>Group Mark Analysis</h3>
                            <Chart gid={grid} />
                        </> : <></>}

                        {show4 ? <>
                            <DetailsCard stu={students.length > 0 ? students : ""} grp={group._id ? group : ""} />
                        </> : <>
                        </>

                        }


                    </div>
                </div>
            </div>

        </div >
    );
}

export default AllocatedGroups;