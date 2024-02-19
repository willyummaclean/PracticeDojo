import { Link, useNavigate } from "react-router-dom"
import React, { useState } from 'react';
import "./Navbar.css"


export const PracticeNavbar = () => {

    const navigate = useNavigate()
      
        return (
        <div >
            <ul className="navbar">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/myplans" className="navbar-link">My Plans</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/exercises" className="navbar-link">Exercises</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/practicedays" className="navbar-link">Practice Days</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/updateprofile" className="navbar-link">Update Profile</Link>
                </li>

                {localStorage.getItem("musician_user") ? (
                    <li className="navbar-item">
                        <Link
                        to=""
                        className="navbar-link"
                        onClick={() => {
                            localStorage.removeItem("musician_user")
                            navigate("/login", { replace: true })
                        }}
                        >
                        Logout
                        </Link>
                    </li>
                    ) : (
                    ""
                    )}
            </ul>
        </div>
    )
}