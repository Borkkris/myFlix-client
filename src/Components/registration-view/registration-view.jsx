import React, { useState } from "react";
import PropTypes from 'prop-types';


export function RegistrationView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ email, setEmail] = useState('');
    const [ birthdate, setBirthdate] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);

    props.onRegistration(username);
}

return (
    <form>
        <label>
            Username:
            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
            Password: 
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
            Email:
            <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
            Birthdate:
            <input type='date' value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        </label>
        <br />
        <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
    );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};