import { React, useState, useEffect } from "react";
import axios from "axios";

import TypeCard from "../TypeCard/TypeCard";
import { Image } from '@chakra-ui/react';
import egg from '../../../images/egg.png';

import './EvolutionsCard.css';

const fetchEvolutionsChain = (chain) => axios.get(chain);

const getPokemonByName = (name) => axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

const getEvolutions = async (chain) => {
    const allEvolutions = [];
    const promiseArrayEvolutions = [];
    const base = getPokemonByName(chain?.species?.name);
    promiseArrayEvolutions.push(base);

    for (const evolution of chain?.evolves_to) {
        //2 nivels evolution
        const evolution1 = getPokemonByName(evolution?.species?.name);
        promiseArrayEvolutions.push(evolution1);

        if (evolution.evolves_to.length) {
            //3 nivels evolution
            for (const nextEvolution of evolution.evolves_to) {
                const evolution2 = getPokemonByName(nextEvolution?.species?.name);
                promiseArrayEvolutions.push(evolution2);
            }
        }
    }

    const response = await Promise.all(promiseArrayEvolutions);
    const evolutionsResponses = response.map((el) => el.data);
    const baseEvolution = evolutionsResponses.find((el) => el?.name === chain?.species?.name);

    //create the evolution nivels
    for (const evolution of chain?.evolves_to) {
        const evolution2 = evolutionsResponses.find((el) => el?.name === evolution?.species?.name);
        //2 nivels evolution
        const nivel = [baseEvolution, evolution2];

        if (evolution.evolves_to.length) {
            //3 nivels evololution
            for (const nextEvolution of evolution.evolves_to) {
                const evolution2 = evolutionsResponses.find((el) => el?.name === nextEvolution?.species?.name);
                nivel.push(evolution2);
            }
        }

        allEvolutions.push(nivel);
    }

    return allEvolutions;
}

export default function EvolutionsCard({ pokemonType, species }) {
    const [evolutions, setEvolutions] = useState([]);

    useEffect(async () => {
        //set the evolution chain
        if (species?.evolution_chain?.url) {
            const chain = await fetchEvolutionsChain(species?.evolution_chain?.url);
            const allEvolutions = await getEvolutions(chain?.data.chain);
            setEvolutions(allEvolutions)
        }
    }, [species]);

    const renderEvolution = (pokemon) => {
        const id = String(pokemon?.id).padStart(3, '0');
        const image = pokemon?.sprites?.other?.['official-artwork']?.front_default;

        return (
            <a href={`/pokemon/${pokemon.id}`}>
                <div className="evolutionContainer">
                    <div className="evolutionContainerHeader">
                        <div className="evolutionName">
                            {pokemon.name}
                        </div>
                        <div className="evolutionId">
                            #{id}
                        </div>
                    </div>
                    <Image
                        boxSize='150px'
                        objectFit='cover'
                        src={image}
                        alt="pokemon"
                        fallbackSrc={egg}
                    />
                    <div className="types">
                        {pokemon.types.map((type) => <TypeCard type={type} />)}
                    </div>
                </div>
            </a>
        );
    }

    return evolutions.map((line) => (
        <div className={`containerEvolutionsCard ${pokemonType}`}>
            {
                line.map((el) => renderEvolution(el))
            }
        </div>
    ));
}