import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

import UserInfo from './user-info'; // child-element imported into the parent-element

// Import custom SCSS
import "./profile-view.scss";

    export class ProfileView extends React.Component ({movies, onUpdatedUserInfo}) {
        constructor() {
            super();
            this.state = {
                Username: null,
                Password: null,
                Email: null,
                Birthday: null,
                FavoriteMovies: [],
            };
        }
    
    componentDidMount() {
        const accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    getUser = (token) => {
        const Username = localStorage.getItem("user");
    axios.get(`https://ap-myflix.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    
    // when user logges out
    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
    window.open("/", "_self");
    }

}
