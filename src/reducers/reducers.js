import { combineReducers } from 'redux';


import {SET_MOVIES, SET_FILTER } from '../actions/actions'

// REDUCERS:
// Every time an action is dispatched, this reducer will be called, 
// and it’s responsible for addressing the action or not, hence the switch-case syntax.
function visibilityFilter (state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies (state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log('SET_MOVIES reducer reached')
            return action.value;
        default:
            return state;
    }
}

// combined reducer
const moviesApp = combineReducers({
        visibilityFilter,
        movies
});

export default moviesApp;