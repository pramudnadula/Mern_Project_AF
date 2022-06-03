import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap'
import '../../Assets/Styles/NavBar_Home.css'

import { Link, useParams } from 'react-router-dom';


function NavBar_Home(props) {
    return (
        <>
            <Navbar className='headerNavBar_home'>
                <Container>
                    <Navbar.Brand className='nav_icon' href="#home">RMS</Navbar.Brand>
                    <div style={{ float: 'right'}}>
                    < Link to="/login"><button className="btn btn-light login_home m-2 pt-2 pb-2 p-4" type="submit" value="">Login</button></Link>
                    < Link to="/register"><button className="btn btn-light login_home m-2 pt-2 pb-2 p-4" type="submit" value="">Student Register</button></Link>
                    < Link to="/staffregister"><button className="btn btn-light login_home m-2 mr-2 pt-2 pb-2 p-4" type="submit" value="">Supervisor Register</button></Link>
                    </div>
                </Container>
            </Navbar>

        </>
    );
}

export default NavBar_Home;