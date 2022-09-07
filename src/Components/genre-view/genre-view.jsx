import React from 'react';

export class GenreView extends React.Component {

    render() {
        const { onBackClick } = this.props;


        return (
            <button 
                onClick={() => { onBackClick() }}>
                    Back
            </button>
        );
    }
}