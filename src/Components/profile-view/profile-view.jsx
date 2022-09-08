import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Card, Col, Row, Container, Button, Form, Figure,  } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

// Import custom SCSS
import './profile-view.scss';

    export class ProfileView extends React.Component {
        constructor() {
            super();
            this.state = {
                Username: null,
                Password: null,
                Email: null,
                Birthday: null,
                FavoriteMovies: [],
            };
        }
    
    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    // when user logges out
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
        });
    window.open('/', '_self');
    }

    // when user deletes a movie from favorite list
    onRemoveFavorite = (e, movie) => {
        const Username = localStorage.getItem('user');
        console.log(Username);
        const token = localStorage.getItem('token');
        console.log(this.props);

        axios.delete(`https://app-my-flix.herokuapp.com/users(${Username}/movies/${movieID}`,
        { headers: { Authorization: `Bearer ${token}`} }
        )
        .then((response) => {
            console.log(response);
            alert(`${movie.Title} was removed from your favorites`)
            this.componentDidMount();
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
    };

    // get user by name
    getUser = (token) => {
        const Username = localStorage.getItem('user');

    axios.get(`https://app-my-flix.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    // update user by name
    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://app-my-flix.herokuapp.com/users/${Username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday,
            },
            {
                headers: { Authorization: `Bearer ${token}`}
            }
        )
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
            });
        
            localStorage.setItem('user', this.state.Username);
            const data = response.data;
            console.log(data);
            console.log(this.state.Username);
            alert('You updated your profile!');
            window.open(`/users/${Username}`, '_self');
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    // Derigister
    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://app-my-flix.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            console.log(response);
            alert('Your profile has been deleted!');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open('/', '_self');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // Set user values
  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

    render () {
    const { FavoriteMovies, Username, Password, Email, Birthday } = this.state;

    return (
        <Container>
            <Row>
                <Col>
                    <Card className = 'user-profile'>
                        <Card.Header>{Username}'s profile</Card.Header>
                        <Card.Body>
                            <>
                                Name: {Username}
                                <br />
                                Email: {Email}
                                <br />
                                Birthday: {Birthday}
                            </>
                        </Card.Body>
                    </Card>
                </Col>
                <br />
                <Col>
                    <Card className = 'update-inputs'>
                        <CardHeader>Update Profile</CardHeader>
                        <Card.Body>
                            <Card.Text>
                                <Form 
                                    className='update-form'
                                    onSubmit ={(e) =>
                                        this.editUser(
                                            e,
                                            this.Username,
                                            this.Password,
                                            this.Email,
                                            this.Birthday
                                        )
                                    } 
                                >
                                    <Form.Group>
                                       
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder="New Username"
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                        </Form.Group>

                                        <br />

                                        <Form.Group>
                                        
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            placeholder="New Password"
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            required
                                        />
                                        </Form.Group>

                                        <br />

                                        <Form.Group>
                                        
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="New Email"
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                        </Form.Group>

                                        <br />

                                        <Form.Group>
                                        
                                        <Form.Control
                                            type="date"
                                            name="Birthday"
                                            onChange={(e) => this.setBirthday(e.target.value)}
                                        />
                                        </Form.Group>

                                        <br />

                                        <Form.Group>
                                        <Button
                                            variant="success"
                                            type="submit"
                                            onClick={() => this.editUser()}
                                        >
                                            Update User
                                        </Button>
                                        <Button
                                            className="delete-button"
                                            variant="danger"
                                            onClick={() => this.onDeleteUser()}
                                        >
                                            Delete User
                                        </Button>
                                        </Form.Group>

                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Card className='favmov-inputs'>
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <h4>Favorite Movies</h4>
                        </Col>
                    </Row>
                    <Row>
                        {FavoriteMovies.map((ImagePath, Title, _id) => {
                            return (
                                <Col key={m._id} className="fav-movie">
                                    <Figure>
                                        <Link to={`/movies/${movieID}`}>
                                            <Figure.Image src={ImagePath} alt={Title} />
                                            <Figure.Caption>{Title}</Figure.Caption>
                                        </Link>
                                    </Figure>
                                    <br />
                                    <Button
                                        className="remove"
                                        variant="secondary"
                                        onClick={() => removeFav(movieID)}
                                    >
                                         Remove from the list
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
    }
}
