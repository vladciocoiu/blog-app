import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import "./LoginPage.css";
import LoginRequest from "./LoginRequest";

export default function LoginPage () {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

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

        try {
            const data = await LoginRequest(emailText, passwordText);

            // store user info in authContext
            setAuth(data);

            // redirect user to index page 
            navigate('/shared-blog/');

        // if error just display it
        } catch (err) {
            setError(err.response.data.error);
            console.log(err);
        }

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