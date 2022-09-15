import React from "react";
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import  { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const {movies, visibilityFilter} = props; // two propperties
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())); // The toLowerCase() method is a built-in method for strings. It returns the same string in lower case characters.
    }

    if (!movies) return <div className = 'main-view' />;

    return filteredMovies.map(m => (
        <Col md={3} key={m._id}>
            <MovieCard movie={m} />
        </Col>
    ));
}
//mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will use
export default connect(mapStateToProps) (MoviesList);