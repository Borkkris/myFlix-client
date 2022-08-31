import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props; // integrates the child element into the parent element (main-view.jsx)
        
        return ( 
            <div onClick={() => onMovieClick(movie)}
            className="movie-card">{movie.Title}</div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({ // The props object must include a movie object
        Title: PropTypes.string}).isRequired, // The movie prop (object) may contain a Title key; if it does, then it must be of type string
    onMovieClick: PropTypes.func.isRequired // The props object must contain onMovieClick and it must be a function
};