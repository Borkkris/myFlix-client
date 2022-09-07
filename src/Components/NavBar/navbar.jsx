import React from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export function Menubar({user}) {
    
    //Sign out method
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    //Token method
    const isAuth = () => {
        if(typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (

    <Navbar className="main-nav" sticky="top" bg="darfk" expand="lg" variant="dark">
        <Container>
            <Navbar.Brand className="navbar-logo" href="/">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="m1-auto">
                    {/* Hide sign up if the token exists */}
                    {isAuth() && (
                        <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                    )}
                    {isAuth() && (
                        <Button variant="link" onClick= {() => { this.onLoggedOut() }}>Logout</Button>
                    )}
                    {isAuth() && (
                        <Nav.Link href="/">Sign-in</Nav.Link>
                    )}
                    {isAuth() && (
                        <Nav.Link href="/register">Sign-up</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}