import React from 'react';// imports react into the file. Its important for creating components
import { BrowserRouter as Router, Route, Redirect  } from 'react-router-dom'; // react-router library for routing / BrowserRouter for state-based-routing
import axios from 'axios';// imports axios into the file. Its important to do Ajax requests
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux'; // use connect to import connect-function from react-redux to connect any stateful-component of the app to the store



//importing component MovieCard, MovieView...
import { Menubar } from '../NavBar/navbar';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { setMovies } from '../../actions/actions';

// this one must be still written
import MoviesList from '../movies-list/movies-list';

import './main-view.scss';
import t from 'email-prop-type';


// export makes the ne component usable by others
class MainView extends React.Component { //this generates the mainView component
    
    constructor(){ //The method that React uses to actually create the component in-memory + starting point of any class component
        super(); //initializes your component’s state + mendatory when using constructor function + will call the parent React.Component’s constructor, which will give my class the actual React component’s features
       
        this.state = {
            favoriteMovies: [],
            user: null, //The user property is initialized to null in the state (default is logged out). When the app is first run or when a user has logged out, there is no user that is logged in, hence setting the user to null.
            userObj: null,
        }; 
    }

    // code executed right after the component is added to the DOM.
    componentDidMount(){
        let accessToken = localStorage.getItem('token'); //  et the value of the token from localStorage
        if (accessToken !== null) {
            const user = localStorage.getItem('user');
            this.setState({
                user
            });
            this.getMovies(accessToken);
            this.getUser(user, accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://app-my-flix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`} // By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API
        })
        .then((response) => {
            this.props.setMovies(response.data); // parses the repsonse into setMovies
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getUser(username, token) {
        axios.get(`https://app-my-flix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}`} // By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API
        })
        .then((response) => {
            // this.props.setUser(response.data); // parses the repsonse into setMovies
            this.setState({userObj: response.data});
            const favMoviesObj = this.props.movies.filter(m => response.data.FavoriteMovies.includes(m._id));
            this.setState({favoriteMovies:favMoviesObj})
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleFavorite = (movie, action) => {
        console.log(this.state)
        const { Username, FavoriteMovies } = this.state.userObj;
        console.log(Username, FavoriteMovies)
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null && Username !== null) {
            // Add MovieID to Favorites (local state & webserver)
            if (action === 'add') {
                axios.post(`https://app-my-flix.herokuapp.com/users/${Username}/movies/${movie._id}`, {},
                    {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    }
                )
            .then((res) => {
                alert(`Movie added to ${Username} Favorite movies`);
                this.setState({
                    favoriteMovies: [...this.state.favoriteMovies, movie]
                })
            })
            .catch((err) => {
                console.log(err);
            });

            // Remove MovieID from Favorites (local state & webserver)
            } else if (action === 'remove') {
                axios.delete(`https://app-my-flix.herokuapp.com/users/${Username}/movies/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
                )
            .then((res) => {
                alert(`Movie removed from ${Username} favorite movies`);
                const favMovies = this.state.favoriteMovies;
                console.log("favMovies before splice", favMovies)
                favMovies.splice(favMovies.findIndex(fm => fm._id === movie._id), 1);
                console.log("favMovies after splice", favMovies)
                this.setState({
                    favoriteMovies: [...favMovies]
                })
            })
            .catch((err) => {
                console.log(err);
            });
            } 
        }
    };

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
        let { movies } = this.props; // now this has the movies because movies are passed into props via mapStateToProps function
        let { user } = this.state;
        let { favoriteMovies } = this.state;
        

        return (
            <Router> {/* to create routes */}
                <Menubar user={user} />
                <Container>
                    <Row className='main-view justify-content-md-center'> 

                            {/* route for link on main-view to login-view */}    
                            <Route  exact path='/' render={() => {
                                // if there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the loginView
                                if (!user) 
                                    return ( 
                                        <Col>
                                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                        </Col>
                                    );

                                // Before the movies have been loaded
                                if (movies.length === 0) 
                                    return <div className='main-view' />
                                    return <MoviesList movies={movies}/>;
                            }} />

                            {/* route for link on main-view to registration-view */}
                            <Route path='/register' render={() => {
                                if (user) return <Redirect to='/' />
                                return <Col>
                                    <RegistrationView />
                                </Col>
                            }} />

                            {/* route for link on main-view to movie-view */}
                            <Route path='/movies/:id' render={({ match, history }) => {
                                if (!user) 
                                    return <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                    if (movies.length === 0) return <div className = 'main-view' />;
                                return <Col md={8}>
                                    <MovieView movie={movies.find(m => m._id === match.params.id)} handleFavorite={this.handleFavorite} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />

                            {/* route for link on main-view to director-view */}
                            <Route path='/directors/:name' render={({ match, history }) => {
                                if (!user) 
                                    return <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                if (movies.length === 0) return <div className = 'main-view' />;
                                return <Col md={8}>
                                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} /> {/* loop through the movies array (using the find() method) and compare the director’s name from your database*/}
                                </Col>
                            }} />

                            {/* route for link on main-view to genre-view */}
                            <Route path='/genres/:name' render={({ match, history }) => {
                                if (!user) 
                                    return <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                if (movies.length === 0) return <div className = 'main-view' />;
                                return <Col md={8}>
                                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} /> {/* loop through the movies array (using the find() method) and compare the director’s name from your database*/}
                                </Col>
                            }} />

                            {/* route for link on main-view to profile-view */}
                            <Route path={`/users/${user}`} render={({history}) => {
                                if (!user) return <Redirect to='/' />
                                return <Col>
                                    <ProfileView 
                                    user={user} 
                                    onBackClick={() => history.goBack()}
                                    favoriteMovies={favoriteMovies || []}
                                    handleFavorite={this.handleFavorite}
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


let mapStateToProps = state => { 
    return { movies: state.movies }
}
// mapStateToProps is a function that—if defined—will allow the component (the one you want to connect) to subscribe to store updates. 
// Any time the store is updated, this function will be called.

// the output is the setMovies action / component is MainView / Connecting this component to an action allows you to receive the actual action as a prop.
// connect() is central to React Redux - > it means:  wrap any stateful component to connect it to a store
// setMovies is given as a prop to your MainView component because it’s wrapped in the connect() function.
export default connect(mapStateToProps, { setMovies } )(MainView) // default used to get rid of the curly braces (also in import)