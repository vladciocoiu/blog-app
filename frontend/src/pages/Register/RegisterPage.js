import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./RegisterPage.css";
import RegisterRequest from "./RegisterRequest.js";

export default function RegisterPage () {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [nameText, setNameText] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // remove error message when user starts typing
    useEffect(() => {
        setError('');
    }, [nameText, emailText, passwordText, confirmPasswordText]);

    // update state based on input value
    const handleInputChange = (setState, e) => {
        setState(e.target.value);
    }

    // submit login credentials to server
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await RegisterRequest(nameText, emailText, passwordText, confirmPasswordText);

            // redirect user to login page if register was successful
            navigate('/shared-blog/login');

        // if error just display it
        } catch (err) {
            setError(err.response.data.error);
            console.log(err);
        }
    }

    return (<main className="register-main">
        <h2 className="register-heading">Register</h2>
        <p className="display-error">{error}</p>
        <form onSubmit={handleSubmit}>
            <input className="name-input" type="text" placeholder="Name" name="name" onChange={e => handleInputChange(setNameText, e)} />
            <input className="email-input" type="email" placeholder="Email" name="email" onChange={e => handleInputChange(setEmailText, e)} />
            <input className="password-input" type="password" placeholder="Password" name="password" onChange={e => handleInputChange(setPasswordText, e)} />
            <input className="confirm-password-input" type="password" placeholder="Confirm Password" name="confirm-password" onChange={e => handleInputChange(setConfirmPasswordText, e)} />
            <input className="submit" type="submit" value="Register" />
        </form>
        <Link className="login-link" to="/shared-blog/login">Already have an account?</Link>
    </main>);
};