import React from 'react';
import {NavLink} from "react-router-dom";

function Navbar({classes}) {
    return (
        <>
            <nav className={classes}>
                <a className="navbar-brand" href="/">
                    JEDI
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/people">People</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/planets">Planets</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/starships">Starships</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;