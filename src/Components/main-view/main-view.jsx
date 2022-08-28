// imports react into the file
import React from 'react';


//importing component movierCard
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// export makes the ne component usable by others
export class MainView extends React.Component { //uses generic React component Template
    

    constructor(){ //If I hadn’t included constructor, the component would still be initialized in the default manner
        super(); //initializes your component’s state
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
                { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
            ],
            selectedMovie: null
        } 
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    // controls what the component displays
    render() {
        const { movies, selectedMovie } = this.state; //info from the parent going to the child

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie (newSelectedMovie); }}/>
                :movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {
                    this.setSelectedMovie (movie) }}/>))
                }
            </div>
        );
    }
}

export default MainView; // default used to get rid of the curly braces (also in import)