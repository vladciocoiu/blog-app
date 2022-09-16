import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

        const data = await RegisterRequest(nameText, emailText, passwordText, confirmPasswordText);
        console.log(data);

        // display error if any
        if(data.error) setError(data.error);

        // redirect user to login page if register was successful
        else navigate('/login');
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
    </main>);
};