import React from 'react';

export class DirectorView extends React.Component {

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