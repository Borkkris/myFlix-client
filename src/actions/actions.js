// The first step is to define what actions you’re going to deal with, that is, what interactions your app is going to support.

// declared action-types in variables:
export const SET_MOVIES = 'SET_MOVIES'; // initializes the movies list with movie
export const SET_FILTER = 'SET_FILTER'; // sets a filter to my movie list


// The reason for exporting functions is convenience: you’ll be able to call them from wherever you want to perform said actions. 
//Think of these functions like event constructors: you’ll call them from a view to formally express the change you want to perform on the application’s state.
// ACTIONS:
export function setMovies(value) {
    return { 
        type: SET_MOVIES, 
        value 
    };
}

export function setFilter(value) {
    return { 
        type: SET_FILTER, 
        value 
    };
}