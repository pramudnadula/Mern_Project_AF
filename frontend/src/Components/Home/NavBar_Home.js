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
                    <Nav className="me-auto">
                        <Nav.Link className='home_nav' href="#home">Home</Nav.Link>
                        <Nav.Link className='home_nav' href="#features">Features</Nav.Link>
                        <Nav.Link className='home_nav' href="#pricing">Pricing</Nav.Link>




                    </Nav>

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
                    < Link to="/login"><button className="btn btn-light login_home pt-2 pb-2 p-4" type="submit" value="">Login</button></Link>
                </Container>
            </Navbar>

        </>
    );
}

export default NavBar_Home;