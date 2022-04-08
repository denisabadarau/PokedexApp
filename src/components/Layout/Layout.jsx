import React from "react";
import './Layout.css';

export default function Layout(props) {
    return (
        <div className="Layout">
            <div className="LayoutContainer">
                <div className="LayoutHeader">
                    <a href="/">
                        <div className="title">
                            Pokedex
                        </div>
                    </a>
                </div>
                <div className="LayoutContent">
                    {props.children}
                </div>
            </div>
        </div>
    );
}