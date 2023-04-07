import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/Harmonize-logo.png'

const NavBar = () => {
    return (
        <Navbar expand="md" fixed="top">
        <Container>
            <Navbar.Brand>
                <img src={logo} alt='Harmonize logo' height="60" width="60" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link>
                <i class="fa-solid fa-house"></i>Home
            </Nav.Link>
            <Nav.Link>
                <i class="fa-solid fa-user-plus"></i>Sign up
            </Nav.Link>
            <Nav.Link>
                <i class="fa-solid fa-right-to-bracket"></i>Log in
            </Nav.Link>
        </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  );
};

export default NavBar;