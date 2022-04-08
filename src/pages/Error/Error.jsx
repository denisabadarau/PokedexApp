import React from "react";
import Error from '../../images/Error.png';
import './Error.css';

export default function ErrorPage() {
    return (
        <>
            <p>Hi! I'm Snorlax. I'm blocking the path.</p>
            <div className="errorPageImage">
                <img src={Error} alt="error" />
            </div>
            <p>
                Click
                <a href="/"> here </a>
                to go back.
            </p>
        </>
    );
}