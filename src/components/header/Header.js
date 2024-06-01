// Header.js

import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

const Header = ({ isLoggedIn }) => {
    return (
        <div className="header">
            {isLoggedIn && (
                <div className="headerLeft">
                    <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="IMDB Logo" /></Link>
                    <Link to="/" style={{textDecoration: "none"}}><span>Logout</span></Link>
                </div>
            )}
        </div>
    )
}

export default Header
