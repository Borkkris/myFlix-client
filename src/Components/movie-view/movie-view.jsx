import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

    render () {
        const { movie, onBackClick, handleFavorite } = this.props;

        return (
            <Card className='movie-view'>
                <Card.Header>
                    <Card.Img variant='top' crossorigin='anonymous' src={movie.ImagePath} />
                </Card.Header>
                <Card.Body className='movie-view-title'>
                    <h1>{movie.Title}</h1>
                </Card.Body>
                <Card.Body>
                    <h4>Genre</h4>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <h3 className='genre-link link'>{movie.Genre.Name}</h3>
                    </Link>
                </Card.Body>
                <Card.Body>
                    <h4>Director</h4>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <h3 className="director-link link">{movie.Director.Name}</h3>
                    </Link>
                </Card.Body >
                <Card.Body>
                    <h4>Description:</h4>
                    {movie.Description}
                </Card.Body>
                <Card.Footer className='movie-view-card-footer'> 
                    <Button
                        className='movie-view-favorite-button rounded-circle'
                        variant="light"
                        onClick={() => {
                            handleFavorite(movie._id, 'add')
                        }}
                    >
                        🖤
                    </Button>
                    <Button
                        className='movie-view-back-button'
                        variant="dark"
                        onClick={() => {
                        onBackClick();
                        }}
                    >
                        Back
                    </Button>
                </Card.Footer>
            </Card> 
        );
    }
}