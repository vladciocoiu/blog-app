import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import "./Navbar.css";

export default function Navbar() {
    const { auth } = useContext(AuthContext);

    return (
        <nav>
            <h3 className="nav-title">Blog App</h3>
            <section className="nav-link-section">
                <Link className="nav-home-link nav-link" to="/"><h4 >Home</h4></Link>
                {
                    auth?.userName
                    ? <Link className="nav-post-link nav-link" to="/create-post"><h4>Create Post</h4></Link>
                    : <>
                        <Link className="nav-login-link nav-link" to="/login"><h4 >Log In</h4></Link>
                        <Link className="nav-register-link nav-link" to="/register"><h4 >Register</h4></Link>
                    </>
                }
            </section>
        </nav>
    );
}