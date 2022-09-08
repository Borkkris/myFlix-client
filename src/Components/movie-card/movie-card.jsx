import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props; // integrates the child element into the parent element (main-view.jsx)
        
        // card that displays your movie’s image, title, and description, along with a button to open the card
        return ( 
            <Card>
                <Card.Img variant='top' src={movie.ImagePath} crossOrigin='anonymous' />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie_id}`}> {/* routing to the movie*/}
                    Open
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({ // The props object must include a movie object
        Title: PropTypes.string.isRequired, // The movie prop (object) may contain a Title key; if it does, then it must be of type string
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func, // The props object must contain onMovieClick and it must be a function
};