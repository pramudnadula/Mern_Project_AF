import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap'
import '../../Assets/Styles/NavBar_DashBoard.css'

function NavBar_DashBoard(props) {
    return (
        <>
            <Navbar className='headerNavBar'>
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




                </Container>
            </Navbar>
        </>
    );
}

export default NavBar_DashBoard;