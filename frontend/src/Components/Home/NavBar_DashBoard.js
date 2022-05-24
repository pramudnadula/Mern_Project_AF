import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap'
import '../../Assets/Styles/NavBar_DashBoard.css'
import { Link, useLocation } from 'react-router-dom'
import { Badge, Avatar, Modal, message } from 'antd';
import dpic from '../../Assets/Images/ff.webp'
import axios from 'axios';
function NavBar_DashBoard(props) {
    const userid = localStorage.getItem("user");
    const [modalvisible, setmodalvisible] = useState(false)
    const [request, setrequest] = useState([])
    const location = useLocation();

    useEffect(() => {
        axios.get(`http://localhost:8070/api/request/all/${userid}`).then((data) => {
            setrequest(data.data)
        }).catch((err) => {
            console.log(err)
        })


    }, [request])


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
        axios.post('http://localhost:8070/api/request/response', ob).then((data) => {
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
            <Navbar className={(location.pathname === '/') || (location.pathname === '/login') || (location.pathname === '/register') ? "block" : "headerNavBar"}>

                <Modal
                    title="Group Requests"
                    style={{ top: 20 }}
                    visible={modalvisible}
                    onOk={() => setmodalvisible(false)}
                    onCancel={() => setmodalvisible(false)}
                >
                    <div className='row'>
                        <div className='col-12'>
                            {request.map((re, i) => (
                                <div className='row reqrow'>
                                    <div className='col-3'>
                                        <img src={dpic} width={80} className="img-fluid d-block" />
                                    </div>
                                    <div className='col-6'>
                                        <div className='row'>
                                            <div className='col-10'>
                                                <h4>Group Invitation</h4>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-12'>
                                                <h5>Kavindu senevirathna</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-3'>
                                        <div className='row justify-content-center'>
                                            <div className='col-10'>
                                                <button className='btn btn-success' onClick={(e) => { sendresponse(true, re.group, re.reciever, re._id) }}>Accept</button>
                                            </div>
                                        </div>

                                        <div className='row mt-2 justify-content-center'>
                                            <div className='col-10'>
                                                <button className='btn btn-danger' onClick={(e) => { sendresponse(false, re.group, re.reciever, re._id) }}>Reject</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>



                <Container>
                    <Navbar.Brand href="#home">RMS</Navbar.Brand>
                    {/* <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav> */}






                    <Form className="d-flex m-4">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>

                    </Form>
                    {/* <button className='btn btn-light login_home pt-2 pb-2 p-4' >Login</button> */}
                    {(request.length > 0) ? <>
                        <Badge count={request.length}>
                            <button className="btn btn-warning btn-circle btn-circle-sm m-1 cbtn" onClick={(e) => { setmodalvisible(true) }}><i className="fa fa-bell"></i></button>
                        </Badge>
                    </> : <>
                        <button className="btn btn-warning btn-circle btn-circle-sm m-1 cbtn" onClick={(e) => { setmodalvisible(true) }}><i className="fa fa-bell"></i></button>
                    </>}


                    {/* profile  start*/}

                    <div className="navbar-dropdown">

                        {(localStorage.getItem) && (<>
                            <Link to="/staffprofile" className="navbar-item"> <i className="fa fa-user mr-2"></i>My Account </Link>
                        </>
                        )}
                        {(localStorage.getItem('token')) && (<>
                            <Link to="/userprofile" className="navbar-item"> <i className="fa fa-user mr-2"></i>My Account </Link>
                        </>
                        )}
                        {/* profile  end*/}

                     <div className="">	
							         <a className="navbar-item" onClick={(e) => {
								           localStorage.clear();
								           window.location.href="/"
							            }}>
								          <b> Sign Out </b>
							        </a>
						        </div>    
                    </div>

                </Container>
            </Navbar>
        </>
    );
}

export default NavBar_DashBoard;