// imports react into the file. Its important for creating components
import React from 'react';
import axios from 'axios';


//importing component MovieCard, MovieView...
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// export makes the ne component usable by others
export class MainView extends React.Component { //this generates the mainView component
    constructor(){ //The method that React uses to actually create the component in-memory + starting point of any class component
        super(); //initializes your component’s state + mendatory when using constructor function + will call the parent React.Component’s constructor, which will give my class the actual React component’s features
        this.state = {
            movies: [],
            selectedMovie: null
        } 
    }
    //GET all movies
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

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    // controls what the component displays or visual representation of the component
    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">coming soon...</div>;

        return (
            <div className="main-view">
                {selectedMovie
                ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                : movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                ))
                }
            </div>
        );
    }
}

export default MainView; // default used to get rid of the curly braces (also in import)