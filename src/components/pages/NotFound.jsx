import React from "react";
import {useLocation} from "react-router-dom"

function NotFound() {
    const location = useLocation();

    return (
        <div className="container">
            <h3 className="display-4">
                404 Not Found <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

export default NotFound;