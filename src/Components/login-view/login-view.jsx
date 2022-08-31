import React, { useState} from 'react'; //useState hook used without writing a new class / 

export function LoginView (props) {
    //call the useState-method imported from React with an empty string / This is the initial value of your login variable
    const [ username, setUsername ] = useState('');
    const [ password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents the default behavior: that the page will refresh/reload when user clicks on button and submits a form for example
        console.log(username, password); //logs username and password into the console
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
    <form>
        <label>
            Username:
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
            Password:
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
    );
}