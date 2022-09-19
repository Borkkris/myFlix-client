import React, { useState } from 'react';
import PropTypes from 'prop-types';
import emailPropType from 'email-prop-type';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './registration-view.scss'


export function RegistrationView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthday, setBirthday] = useState('');

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
            setEmailErr('Email Required')
            isReq = false;
            } else if(email.indexOf('@') === -1){
                setEmailErr('Email is invalid')
                isReq = false;
            }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://app-my-flix.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                console.log('new user registration')
                alert('Registration successful, please login!');
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error registering a user')
                alert('unable to register');
            });
        }
    };

    return (
        <Container>
            <Row className='mt-5'>
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
                                            placeholder='Username'
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
                                            placeholder='New Password'
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
                                            placeholder='Email'
                                            />

                                           {emailErr && <p>{emailErr}</p>}

                                    </Form.Group>

                                    <br />

                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type='date' 
                                            value={birthday} 
                                            onChange={e => setBirthday(e.target.value)} 
                                            />
                                    </Form.Group>

                                    <br />

                                    <Button
                                    className='register-register'
                                    variant='success'
                                    type='submit'
                                    onClick={handleSubmit}
                                    >
                                    Sign Up
                                    </Button>

                                    <br />

                                    <div className='register-login'>
                                    <Link to='/'>
                                            Log In
                                    </Link>
                                    </div>
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
    Birthday: PropTypes.string.isRequired,
    }),
  onRegistration: PropTypes.func.isRequired,
};