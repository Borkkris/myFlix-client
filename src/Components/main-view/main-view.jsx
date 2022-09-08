import React from 'react';// imports react into the file. Its important for creating components
import { BrowserRouter as Router, Route, Redirect  } from 'react-router-dom'; // react-router library for routing / BrowserRouter for state-based-routing
import axios from 'axios';// imports axios into the file. Its important to do Ajax requests
import { Container, Col, Row } from 'react-bootstrap';
import { Menubar } from '../NavBar/navbar';


//importing component MovieCard, MovieView...
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { directorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView} from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
// import { UserUpdate } from '../profile-view/user-update';

import './main-view.scss';


// export makes the ne component usable by others
class MainView extends React.Component { //this generates the mainView component
    
    constructor(){ //The method that React uses to actually create the component in-memory + starting point of any class component
        super(); //initializes your component’s state + mendatory when using constructor function + will call the parent React.Component’s constructor, which will give my class the actual React component’s features
        this.state = {
            movies: [],
            user: null //The user property is initialized to null in the state (default is logged out). When the app is first run or when a user has logged out, there is no user that is logged in, hence setting the user to null.
        } 
    }

    // code executed right after the component is added to the DOM.
    componentDidMount(){
        let accessToken = localStorage.getItem('token'); //  et the value of the token from localStorage
        if (accessToken !== null) {
            this.setState({
                user:localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

     onLoggedIn(authData) { // When a user logs in, the props onLoggedIn(data) is passed to the LoginView and triggers the function onLoggedIn(authData) in the MainView. This updates the state with the logged in authData.

        console.log(authData); // authData sent to the console
        
        this.setState({
            user:authData.user.Username, // users Username is saved in the user state
        });
        /*The auth information received from the handleSubmit method, 
        the token and the user, is saved in localStorage*/
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        /*this.getMovies(authData) is called and gets the
         movies from your API once the user is logged in*/
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://app-my-flix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`} // By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API
        })
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
   
    onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

    // controls what the component displays or visual representation of the component
    render() {
        const { movies, user} = this.state;


        return (
            <Router>
                <Menubar user={user} />
                <Container>
                    <Row className='main-view justify-content-md-center'> 

                            {/* route for link on main-view to login-view */}    
                            <Route  exact path='/' render={() => {
                                // if there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the loginView
                                if (!user) 
                                    return <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                        </Col>

                                        // Before the movies have been loaded
                                        if (movies.length === 0) 
                                        return <div className='main-view'></div>

                                        return movies.map(m => ( <Col md={4} key={m._id}>
                                            <MovieCard movie={m} />
                                        </Col>
                                ))
                            }} />

                            {/* route for link on main-view to registration-view */}
                            <Route path='/register' render={() => {
                                if (user) return <Redirect to='/' />
                                return <Col>
                                    <RegistrationView />
                                </Col>
                            }} />

                            {/* route for link on main-view to movie-view */}
                            <Route path='/movies/:movieID' render={({ match, history }) => {
                                if (!user) 
                                    return <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                    if (movies.length === 0) 
                                return <Col md={8}>
                                    <div className='main-view'></div>
                                    <MovieView movie={movies.find(m => m._id === match.params.movieID)} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />

                            {/* route for link on main-view to director-view */}
                            <Route path='/directors/:name' render={({ match, history }) => {
                                if (movies.length === 0) return <div className = 'mainView' />;
                                return <Col md={8}>
                                    <DirectorView director={movies.find(m => m.director.Name === match.params.name).Director} onBackClick={() => history.goBack()} /> {/* loop through the movies array (using the find() method) and compare the director’s name from your database*/}
                                </Col>
                            }} />

                            {/* route for link on main-view to genre-view */}
                            <Route path='/genre/:name' render={({ match, history }) => {
                                if (!user) 
                                    return <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                    if (movies.length === 0) 
                                        return 
                                            <div className='main-view'></div>
                                if (movies.length === 0) return <div className = 'mainView' />;
                                return <Col md={8}>
                                    <GenreView genre={movies.find(m => m.genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} /> {/* loop through the movies array (using the find() method) and compare the director’s name from your database*/}
                                </Col>
                            }} />


                            {/* route for link on main-view to User-update */}
                            <Route path={`/user-update/${user}`} render={({ match, history }) => {
                                if (!user) 
                                    return <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                    if (movies.length === 0) 
                                        return 
                                            <div className='main-view'></div>
                                if (!user) return <Redirect to='/' />;
                                return <Col>
                                    <UserUpdate user={user} onBackClick={() => history.goBack()} /> {/* loop through the movies array (using the find() method) and compare the director’s name from your database*/}
                                </Col>
                            }} />

                            {/* route for link on main-view to profile-view */}
                            <Route path={`/users/${user}`} render={({history}) => {
                                if (!user) return <Redirect to='/' />
                                return <Col>
                                    <ProfileView 
                                    user={user} 
                                    onBackClick={() => history.goBack()}
                                    movies={movies}
                                    />
                                </Col>
                            }} />     
                    </Row>
                </Container>
            </Router>
        );
    }
}

export default MainView; // default used to get rid of the curly braces (also in import)