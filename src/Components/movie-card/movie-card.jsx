import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props; // integrates the child element into the parent element (main-view.jsx)
        
        // card that displays your movie’s image, title, and description, along with a button to open the card
        return ( 
            <Card  border="light">
                <Card.Img variant='top' crossOrigin='anonymous' src={movie.ImagePath} />
                <Card.Body className = 'cardBody'>
                    <Card.Title>{movie.Title}</Card.Title>
                    
                </Card.Body>
                <Card.Footer class='movie-card-footer'>
                    <Link className='movie-card-link-open-movie' to={`/movies/${movie._id}`}> {/* routing to the movie*/}
                        Open
                    </Link>
                </Card.Footer>
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