import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl, Dropdown } from 'react-bootstrap'
import '../../Assets/Styles/NavBar_DashBoard.css'
import '../../Assets/Styles/Layout1.css'
import { Link, useLocation } from 'react-router-dom'
import { Badge, Avatar, Modal, message } from 'antd';
import dpic from '../../Assets/Images/ff.webp'
import axios from 'axios';
import { GET, POST } from '../../Helper/httpHelper';
function NavBar_DashBoard(props) {
    const userid = localStorage.getItem("user");
    const [modalvisible, setmodalvisible] = useState(false)
    const [request, setrequest] = useState([])
    const location = useLocation();
    const [currentUser, setcurrentUser] = useState("")

    useEffect(() => {
        if (userid) {
            GET(`api/request/all/${userid}`).then((data) => {
                setrequest(data)
            }).catch((err) => {
                console.log(err)
            })
        }
        Getoneuser();
    }, [request])
    const Getoneuser = () => {

        try {
            GET(`user/getuser/${userid}`).then(res => {
                setcurrentUser(res.user)

            })
        } catch (err) {
            throw err;
        }
    }

    const setmodal = (res) => {
        setmodalvisible(res)
    }

    const sendresponse = (res, gid, uid, rid) => {
        const ob = {
            gid,
            uid,
            rid,
            sta: res
        }
        POST('api/request/response', ob).then((data) => {
            if (res) {
                localStorage.setItem("gid", gid)
                message.success("suceessfully Joined")
            }
            window.location.reload(false)
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <>
            <Navbar className={(location.pathname === '/') || (location.pathname === '/login') || (location.pathname === '/register') || (location.pathname === '/staffregister') || (location.pathname === '/adminlogin') ? "block" : "headerNavBar"} >

                <Modal
                    title=""
                    style={{ top: 20 }}
                    visible={modalvisible}
                    onOk={() => setmodalvisible(false)}
                    onCancel={() => setmodalvisible(false)}
                    footer={null}
                >
                    <div className='row justify-content-center'>
                        <h2 className='text-center'>Requests</h2>
                        <div className='col-12'>
                            {(request.length > 0) ? <>
                                {request.map((re, i) => (
                                    <div className='row reqrow p-2 mb-2'>
                                        <div className='col-3'>
                                            <img src={dpic} width={80} className="img-fluid d-block" />
                                        </div>
                                        <div className='col-6 mt-2'>
                                            <div className='row'>
                                                <div className='col-10'>
                                                    <h4>Group Invitation</h4>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-12'>
                                                    <h5>{re?.group.groupName}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3 mt-2'>
                                            <div className='row justify-content-center'>
                                                <div className='col-10'>
                                                    <button className='btn btn-success' onClick={(e) => { sendresponse(true, re.group._id, re.reciever, re._id) }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                                </div>
                                            </div>

                                            <div className='row mt-2 justify-content-center'>
                                                <div className='col-10'>
                                                    <button className='btn btn-danger' onClick={(e) => { sendresponse(false, re.group._id, re.reciever, re._id) }}><i className="fa fa-times" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </> : <>
                                <h5 className='text-center mt-4 no_request p-3'>No requests were found </h5>
                            </>}

                        </div>
                    </div>
                </Modal>



                <Container fluid>
                    <Navbar.Brand href="#home">RMS</Navbar.Brand>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <NavDropdown title={<img className="rounded-circle" style={{ width: '50px', height: '50px' }} src={"http://localhost:8070/" + currentUser.image} />} >
                            <NavDropdown.Item href="/userprofile"> <Link to="/userprofile"><i className="fa fa-user mr-2"></i>My Account</Link></NavDropdown.Item>
                            <NavDropdown.Divider ></NavDropdown.Divider>
                            <NavDropdown.Item onClick={(e) => { localStorage.clear(); window.location.href = "/" }}><b> Sign Out </b></NavDropdown.Item>
                        </NavDropdown>
                        {/* <button className='btn btn-light login_home pt-2 pb-2 p-4' >Login</button> */}
                        {(request.length > 0) ? <>
                            <Badge count={request.length}>
                                <button style={{ width: '50px', height: '50px' }} className="mt-2 btn btn-warning btn-circle btn-circle-sm m-1 cbtn" onClick={(e) => { setmodalvisible(true) }}><i className="fa fa-bell"></i></button>
                            </Badge>
                        </> : <>
                            <button style={{ width: '50px', height: '50px' }} className="mt-2 btn btn-warning btn-circle btn-circle-sm m-1 cbtn" onClick={(e) => { setmodalvisible(true) }}><i className="fa fa-bell"></i></button>
                        </>}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar_DashBoard;