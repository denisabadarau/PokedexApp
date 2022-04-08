import React from "react";
import getTypeIcon from "../../../shared/getTypeIcon";
import './TypeCard.css';

export default function TypeCard({ type }) {
    const icon = getTypeIcon(type.type.name);
    return (
        <div className={`pokemonType ${type.type.name}`}>
            <div className="pokemonTypeTitle">
                {type.type.name}
            </div>
            <div className="pokemonTypeIcon">
                <img src={icon} alt="icon" />
            </div>
        </div>
    );
}