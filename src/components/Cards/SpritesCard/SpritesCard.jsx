import React from "react";
import { Image } from '@chakra-ui/react';
import './SpritesCard.css';

export default function SpritesCard({ pokemon }) {
    const pokemonType = pokemon.types[0].type.name;
    const sprites = pokemon.sprites;

    var filterSprites = Object.keys(sprites).reduce((acc, el) => {
        // removing all the sprites where value is null
        if (sprites[el] !== null)
            acc[el] = sprites[el];
        return acc;
    }, {})

    const spriteContainer = (spriteTitle, spriteImage) => {
        const title = String(spriteTitle).replaceAll('_', ' ');
        const type = String(spriteTitle).split('_');
        console.log(type)
        let gifType = '';
        if (type[0] === 'front') {
            if (type[1] === 'shiny') {
                gifType = 'shiny';
            } else {
                gifType = 'normal';
            }
        } else {
            if (type[1] === 'shiny') {
                gifType = 'back-shiny';
            } else {
                gifType = 'back-normal';
            }
        }

        return (
            <div className="spriteContainer">
                <div className="spriteCardTitle">
                    {title}
                </div>
                <Image
                    boxSize='100px'
                    objectFit='cover'
                    src={`https://img.pokemondb.net/sprites/black-white/anim/${gifType}/${pokemon?.name}.gif`}
                    alt={gifType}
                    fallbackSrc={spriteImage}
                />
            </div>
        );

    }

    var pokemonSpritesData = [];
    for (const sprite in filterSprites) {
        if (sprite !== 'other' && sprite !== 'versions') {
            pokemonSpritesData.unshift(spriteContainer(sprite, filterSprites[sprite]))
        }
    }

    return (
        <div className={`containerSpritesCard ${pokemonType}`}>
            {pokemonSpritesData}
        </div>
    );
}