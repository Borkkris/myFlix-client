import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export function Menubar() {
    let user = localStorage.getItem('user');
    
    //Sign out method
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.open('/', '_self');
        this.props.onLoggedOut(user);
  };

    //Token method
    const isAuth = () => {
        if(typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    };

    return (

    <Navbar className='main-nav' collapseOnSelect bg='dark' expand='xxl' variant='dark'>
        <Container>
            <Navbar.Brand className='navbar-logo' href='/'>myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='m1-auto'>
                    {/* Hide sign up if the token exists */}
                    {isAuth() && (
                        <Nav.Link as={Link} to={`/users/${user}`}>{user}</Nav.Link>
                    )}
                    {!isAuth() && (
                        <Nav.Link href='/'>Sign in</Nav.Link>
                    )}
                    {!isAuth() && (
                        <Nav.Link href='/register'>Sign up</Nav.Link>
                    )}
                    {isAuth() && (
                        <Nav.Link onClick= {handleLogOut}>Logout</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}