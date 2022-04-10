import React from "react";
import './PowersCard.css';
import { Progress } from '@chakra-ui/react';

export default function PowersCard({ pokemon }) {
    console.log(pokemon);
    const pokemonType = pokemon?.types[0]?.type?.name;

    function getColor(power) {
        if (power < 85) {
            return "red";
        } else if (power >= 85 && power <= 170) {
            return "yellow";
        } else {
            return "green";
        }
    }
    const powerLine = (title, number, key) => (
        <div className="powerLine" key={key}>
            <div className="powerLineTitle">
                {String(title).replaceAll('-', ' ')}
            </div>
            <div className="powerLineBar">
                <Progress
                    hasStripe
                    value={number}
                    size="lg"
                    colorScheme={getColor(number)}
                    isAnimated
                    min='1'
                    max='255'
                />
            </div>
            <div className="powerLineNumber">
                {number}
            </div>
        </div>
    );

    return (
        <div className={`containerPowersCard ${pokemonType}`}>
            {
                pokemon.stats.map(el => powerLine(el?.stat?.name, el?.base_stat, el?.stat?.url))
            }
        </div>
    );
}