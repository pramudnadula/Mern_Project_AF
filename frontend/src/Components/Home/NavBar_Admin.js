import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl, Dropdown } from 'react-bootstrap'
import '../../Assets/Styles/NavBar_DashBoard.css'

import { Link, useLocation } from 'react-router-dom'


function NavBar_Admin(props) {
    return (
        <>
            <Navbar className={(location.pathname === '/') || (location.pathname === '/login') || (location.pathname === '/register') || (location.pathname === '/staffregister') || (location.pathname === '/adminlogin') ? "block" : "admin"}>
                <Container fluid style={{ minHeight: '3.37rem ' }}>
                    <Navbar.Brand href="#home">RMS</Navbar.Brand>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                     <a style={{ textDecoration: 'none', borderRadius: '20px'}} className="m-2 btn btn-danger" onClick={(e) => { localStorage.clear(); window.location.href = "/" }}><b> Sign Out </b></a>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default NavBar_Admin;