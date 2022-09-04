import React, { useState } from 'react'; //useState hook used without writing a new class / 
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';

export function LoginView (props) {
    //call the useState-method imported from React with an empty string / This is the initial value of your login variable
    const [ username, setUsername ] = useState('');
    const [ password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://app-my-flix.herokuapp.com/login', { // TUTOR: not working
            Username: username,
            Password: password
        })
        .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
        })
        .catch(e => {
        console.log('no such user')
        });
    };

    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">myFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Row>
                <Col>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <br />
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                    <br />
                                    <br />
                                    {/* <Form.Label>Sign up:</Form.Label>
                                    <br />
                                    <Button variant="warning" type='submit' onBackClick={handleSubmit}>
                                        Register here
                                    </Button> */}
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};