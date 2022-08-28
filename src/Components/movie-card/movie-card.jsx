import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props; // integrates the child element into the parent element (main-view.jsx)
        return <div className="movie-card" onClick={() => {onMovieClick(movie);}}>{movie.Title}</div>;
    }
}