import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <h3 className="nav-title">Blog App</h3>
            <section className="nav-link-section">
                <Link className="nav-home-link nav-link" to="/"><h4 >Home</h4></Link>
                <Link className="nav-login-link nav-link" to="/login"><h4 >Log In</h4></Link>
                <Link className="nav-register-link nav-link" to="/register"><h4 >Register</h4></Link>
            </section>
        </nav>
    );
}