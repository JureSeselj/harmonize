import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/Harmonize-logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();

  // Variable to display current username in the navbar
  const loggedInNavBar = <>{currentUser?.username}</>;

  // Navbar visible to users not logged-in
  const loggedOutNavBar = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-solid fa-user-plus"></i>Sign up
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/login"
      >
        <i className="fa-solid fa-right-to-bracket"></i>Log in
      </NavLink>
    </>
  );

    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt='Harmonize logo' height="60" width="60" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle
                    className={styles.NavbarToggle}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-right">
                        <NavLink 
                            exact 
                            className={styles.NavLink} 
                            activeClassName={styles.Active} 
                            to="/"
                        >
                            <i className="fa-solid fa-house"></i>Home
                        </NavLink>
                        
                        {currentUser ? loggedInNavBar : loggedOutNavBar}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
};

export default NavBar;