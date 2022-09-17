import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./LoginPage.css";
import LoginRequest from "./LoginRequest";

export default function LoginPage () {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // remove error message when user starts typing
    useEffect(() => {
        setError('');
    }, [emailText, passwordText]);

    // update state based on input value
    const handleInputChange = (setState, e) => {
        setState(e.target.value);
    }

    // submit login credentials to server
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await LoginRequest(emailText, passwordText);
        console.log(data);

        // display error if any
        if(data.error) setError(data.error);

        // redirect user to index page if login was successful
        else navigate('/');
    }

    return (<main className="login-main">
        <h2 className="login-heading">Login</h2>
        <p className="display-error">{error}</p>
        <form onSubmit={handleSubmit}>
            <input className="email-input" type="email" placeholder="Email" name="email" onChange={e => handleInputChange(setEmailText, e)} />
            <input className="password-input" type="password" placeholder="Password" name="password" onChange={e => handleInputChange(setPasswordText, e)} />
            <input className="submit" type="submit" value="Log In" />
        </form>
        <Link className="register-link" to="/register">{'Don\'t have an account? Register.'}</Link>
    </main>);
};