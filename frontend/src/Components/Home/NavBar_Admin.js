import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl, Dropdown } from 'react-bootstrap'
import '../../Assets/Styles/NavBar_DashBoard.css'

import { Link, useLocation } from 'react-router-dom'


function NavBar_Admin(props) {
    return (
        <>
            <Navbar className={(location.pathname === '/') || (location.pathname === '/login') || (location.pathname === '/register') || (location.pathname === '/staffregister') || (location.pathname === '/adminlogin') ? "block" : "admin"}>





                <Container fluid>
                    <Navbar.Brand href="#home">RMS</Navbar.Brand>
                    {/* <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav> */}




                    <Nav className="justify-content-end flex-grow-1 pe-3">



                        <Dropdown className="d-flex m-2">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Profile
                            </Dropdown.Toggle>

                            <Dropdown.Menu>

                                <Dropdown.Item href="/staffprofile"> <i className="fa fa-user mr-2"></i>My Account</Dropdown.Item>

                                <NavDropdown.Divider />
                                <Dropdown.Item><b> Sign Out </b></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default NavBar_Admin;