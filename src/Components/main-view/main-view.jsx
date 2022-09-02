import React from 'react';// imports react into the file. Its important for creating components
import axios from 'axios';// imports axios into the file. Its important to do Ajax requests
import Row  from 'react-bootstrap/Row';
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';


//importing component MovieCard, MovieView...
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '..//login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// export makes the ne component usable by others
class MainView extends React.Component { //this generates the mainView component
    
    constructor(){ //The method that React uses to actually create the component in-memory + starting point of any class component
        super(); //initializes your component’s state + mendatory when using constructor function + will call the parent React.Component’s constructor, which will give my class the actual React component’s features
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null //The user property is initialized to null in the state (default is logged out). When the app is first run or when a user has logged out, there is no user that is logged in, hence setting the user to null.
        } 
    }
    //GET all movies
    // code executed right after the component is added to the DOM.
    componentDidMount(){
        axios.get('https://app-my-flix.herokuapp.com/movies')
        .then(response => {
            this.setState({
            movies: response.data
            });
        })
        .catch(error => {
        console.log(error);
        });
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    //When a user successfully registers
    onRegistration(register) {
    this.setState({
      register,
    });
  }
    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    /*This method will update the user state of the MainView component and will be called when the user has successfully logged in*/
    onLoggedIn(user) {
        this.setState({
            user
        })
    }

    // controls what the component displays or visual representation of the component
    render() {
        const { movies, selectedMovie, user, register} = this.state;

        if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view">loading...</div>;

        return (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#home">myFlix</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#logout">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Row className="main-view justify-content-md-center">
                    {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                    {selectedMovie ? (
                    
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                    )
                    :movies.map(movie => (
                            <Col md={3}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        );
    }
}

export default MainView; // default used to get rid of the curly braces (also in import)