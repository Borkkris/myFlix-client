import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

    render () {
        const { movie, onBackClick, } = this.props;

        return (
            <Card className="movie-view">
                <Card.Header>
                    <Card.Img variant="top" src={movie.ImagePath} />
                </Card.Header>
                <Card.Body className="movie-view-title">
                    <h1>{movie.Title}</h1>
                </Card.Body>
                <Card.Body>
                    <h4>Genre</h4>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <h3 className="genre-link link">{movie.Genre.Name}</h3>
                    </Link>
                </Card.Body>
                <Card.Body>
                    <h4>Director</h4>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <h3 className="director-link link">{movie.Director.Name}</h3>
                    </Link>
                </Card.Body>
                <Card.Body>
                    <h4>Description:</h4>
                    {movie.Description}
                </Card.Body>
                <Card.Footer>
                    <Button
                        className="movie-view-button"
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
    /*
    // code executed right after the component is added to the DOM.
    componentDidMount() {

    }
    // code executed right after component's state or props are changed.
    componentDidUpdate() {

    }
    // code executed just before the moment the component gets removed from the DOM.
    componentWillUnmount() {

    }
    */
}