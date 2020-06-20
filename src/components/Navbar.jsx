import React from 'react';
import {NavLink} from "react-router-dom";

function Navbar({classes}) {
    return (
        <>
            <nav className={classes} style={{zIndex: '10'}}>
                <a className="navbar-brand" href="/">
                    JEDI
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
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