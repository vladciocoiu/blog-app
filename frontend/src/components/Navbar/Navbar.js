import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import LogoutRequest from "./LogoutRequest";
import "./Navbar.css";

export default function Navbar() {
    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        LogoutRequest(setAuth);
        navigate('/shared-blog/');
    }

    return (
        <nav>
            <h3 className="nav-title">Shared Blog</h3>
            <section className="nav-link-section">
                <Link className="nav-home-link nav-link" to="/shared-blog/"><h4 >Home</h4></Link>
                {
                    auth?.accessToken
                    ? <>
                        <Link className="nav-post-link nav-link" to="/shared-blog/create-post"><h4>Create Post</h4></Link>
                        <button className="logout-button" onClick={handleLogoutClick}><h4>Log Out</h4></button>
                    </>
                    : <>
                        <Link className="nav-login-link nav-link" to="/shared-blog/login"><h4 >Log In</h4></Link>
                        <Link className="nav-register-link nav-link" to="/shared-blog/register"><h4 >Register</h4></Link>
                    </>
                }
            </section>
        </nav>
    );
}