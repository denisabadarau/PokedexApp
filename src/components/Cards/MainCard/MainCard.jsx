import React from "react";

import TypeCard from "../TypeCard/TypeCard";
import egg from '../../../images/egg.png';

import { Image } from '@chakra-ui/react';

import './MainCard.css';


export default function MainCard({ pokemon, species }) {
    const image = pokemon.sprites?.other?.['official-artwork']?.front_default;
    let id = String(pokemon.id).padStart(3, '0');
    const pokemonType = pokemon.types[0].type.name;

    function DetailsContainer({ detailsTitle, detailsContent }) {
        return (
            <div className={`detailsContainer ${pokemonType}`}>
                <div className="detailsContainerTitle">
                    {detailsTitle}
                </div>
                <div className="detailsContainerContent">
                    {detailsContent}
                </div>
            </div>

        );
    }

    return (
        <div className={`containerMainCard ${pokemonType}`}>
            <div className="headerMainCard">
                <div className="infoHeader">
                    <div className="mainCardTitle">
                        {pokemon.name}
                    </div>
                    <div className="mainCardId">
                        #{id}
                    </div>
                </div>
                <div className="types">
                    {pokemon.types.map((type) => <TypeCard type={type} key={type.slot} />)}
                </div>
            </div>
            <div className="pokemonImageCard">
                <Image
                    boxSize='400px'
                    objectFit='cover'
                    src={image}
                    alt="pokemon"
                    fallbackSrc={egg}
                />
            </div>
            <div className="footerMainCard">
                <DetailsContainer detailsTitle="Weight" detailsContent={`${pokemon.weight / 10} kg`}></DetailsContainer>
                <DetailsContainer detailsTitle="Height" detailsContent={`${pokemon.height / 10} m`}></DetailsContainer>
                <DetailsContainer detailsTitle="Color" detailsContent={species?.color?.name}></DetailsContainer>
                <DetailsContainer detailsTitle="Habitat" detailsContent={species?.habitat?.name}></DetailsContainer>
                <DetailsContainer detailsTitle="Shape" detailsContent={species?.shape?.name}></DetailsContainer>
            </div>
        </div>
    );
}