import React, { useState } from "react";
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import axios from "axios";


export function RegistrationView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthdate, setBirthdate] = useState('');

    const [ usernameErr, setUsernameErr] = useState('');
    const [ passwordErr, setPasswordErr] = useState('');
    const [ emailErr, setEmailErr] = useState('');

    const validate = () => {
        let isReq = true;
        if(!username) {
            setUsernameErr('Username Required');
            isReq = false;
            } else if(username.length < 2){
                setUsernameErr('Username must be at least 2 characters long');
                isReq = false;
              }
        if(!password) {
            setPasswordErr('Password Required');
            isReq = false;
            } else if(password.length < 3){
                setPasswordErr('must be at least 3 characters long');
                isReq = false;
              }
        if(!email) {
            setEmailErr('Email required')
            isReq = false;
            } else if(email.indexOf("@") === -1){
                setEmailErr('Email is invalid')
                isReq = false;
            }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post("https://ap-myflix.herokuapp.com/users", {
                Username: username,
                Password: password,
                Email: email,
                Birthdate: birthdate,
            })
            .then((response) => {
                const data = response.data;
                console.log(data);
                console.log('new user registration')
                alert("Registration successful, please login!");
                window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch((response) => {
                console.error(response);
                alert("unable to register");
            });
        }
    };

    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">myFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Row>
                <Col md={12}>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>myFlix Registration</Card.Title>
                                <Form>
                                    <Form.Group>
                                        {/* <Form.Label>First name:</Form.Label> */}
                                        <Form.Control
                                            type='text' 
                                            value={username} 
                                            onChange={e => setUsername(e.target.value)} 
                                            placeholder="Username"
                                            />

                                            {usernameErr && <p>{usernameErr}</p>}

                                    </Form.Group>

                                    <br />

                                    <Form.Group>
                                        {/* <Form.Label>Password:</Form.Label> */}
                                        <Form.Control
                                            type='password' 
                                            value={password} 
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="New Password"
                                            />

                                            {passwordErr && <p>{passwordErr}</p>}

                                    </Form.Group>

                                    <br />

                                    <Form.Group>
                                        {/* <Form.Label>Email:</Form.Label> */}
                                        <Form.Control
                                            type='email' 
                                            value={email} 
                                            onChange={e => setEmail(e.target.value)} 
                                            placeholder="Email"
                                            />

                                           {emailErr && <p>{emailErr}</p>}

                                    </Form.Group>

                                    <br />

                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type='date' 
                                            value={birthdate} 
                                            onChange={e => setBirthdate(e.target.value)} 
                                            />
                                    </Form.Group>

                                    <br />

                                    <Button  type='primary' onClick={handleSubmit}>Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    registration: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: emailPropType.isRequired,
    Birthday:PropTypes.instanceOf(Date).isRequired,
    }),
  onRegistration: PropTypes.func.isRequired,
};