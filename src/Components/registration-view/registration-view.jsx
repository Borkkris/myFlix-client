import React, { useState } from "react";
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';


export function RegistrationView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);

        props.onRegistration(username);
    }

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
                                            required
                                            placeholder="Username"
                                            />
                                    </Form.Group>

                                    <br />

                                    <Form.Group>
                                        {/* <Form.Label>Password:</Form.Label> */}
                                        <Form.Control
                                            type='password' 
                                            value={password} 
                                            onChange={e => setPassword(e.target.value)}
                                            required 
                                            minLength="6"
                                            placeholder="New Password"
                                            />
                                    </Form.Group>

                                    <br />

                                    <Form.Group>
                                        {/* <Form.Label>Email:</Form.Label> */}
                                        <Form.Control
                                            type='email' 
                                            value={email} 
                                            onChange={e => setEmail(e.target.value)} 
                                            required
                                            placeholder="Email"
                                            />
                                    </Form.Group>

                                    <br />

                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type='date' 
                                            value={birthdate} 
                                            onChange={e => setBirthdate(e.target.value)} 
                                            required
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