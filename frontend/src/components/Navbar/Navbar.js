import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <h3 className="nav-title">Blog App</h3>
            <Link className="nav-home-link" to="/"><h4 >Home</h4></Link>
        </nav>
    );
}