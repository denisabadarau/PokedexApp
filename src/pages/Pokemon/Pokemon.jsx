import { React, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import MainCard from "../../components/Cards/MainCard/MainCard";
import PowersCard from "../../components/Cards/PowersCard/PowersCard";
import EvolutionsCard from "../../components/Cards/EvolutionsCard/EvolutionsCard";
import SpritesCard from "../../components/Cards/SpritesCard/SpritesCard";
import ErrorPage from "../Error/Error";

import { Stack, Button, Image } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import usePokemonById from "../../hooks/usePokemonById";
import usePokemonSpeciesById from "../../hooks/usePokemonSpeciesById";
import axios from "axios";

import egg from '../../images/egg.png';
import './Pokemon.css';

const getPokemonById = (id) => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

export default function Pokemon() {
    const pokemonId = Number(useParams().pokemonId);
    const { pokemon } = usePokemonById(pokemonId);
    const { species } = usePokemonSpeciesById(pokemonId);
    const descriptions = species?.flavor_text_entries.filter((el) => el?.language?.name === 'en');
    const [currentDesc, setCurrentDesc] = useState();
    const [previousPokemon, setPreviousPokemon] = useState();
    const [nextPokemon, setNextPokemon] = useState();

    useEffect(async () => {
        //set the description
        if (species?.flavor_text_entries) {
            setCurrentDesc(descriptions?.[0]?.flavor_text);
        }
    }, [species]);

    useEffect(async () => {
        let prevPoke = [];
        let nextPoke = [];

        if (pokemonId === 1) {
            prevPoke = await getPokemonById(898);
            nextPoke = await getPokemonById(pokemonId + 1);
        } else if (pokemonId === 898) {
            prevPoke = await getPokemonById(pokemonId - 1);
            nextPoke = await getPokemonById(1);
        } else {
            prevPoke = await getPokemonById(pokemonId - 1);
            nextPoke = await getPokemonById(pokemonId + 1);
        }
        setPreviousPokemon(prevPoke.data);
        setNextPokemon(nextPoke.data);
    }, [pokemon])

    if (pokemonId < 1 || pokemonId > 898) {
        return <ErrorPage />;
    }

    function renderPokemon(pokemon) {
        const pokemonType = pokemon.types[0].type.name;
        return (
            <div>
                <Stack direction='row' spacing={800}>
                    <a href={`/pokemon/${previousPokemon?.id}`}>
                        <Button leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='ghost' size='lg'>
                            <Image
                                borderRadius='full'
                                boxSize='48px'
                                src={previousPokemon?.['sprites']['other']['official-artwork']['front_default']}
                                alt='Dan Abramov'
                                fallbackSrc={egg}
                            />
                        </Button>
                    </a>
                    <a href={`/pokemon/${nextPokemon?.id}`}>
                        <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='ghost' size='lg'>
                            <Image
                                borderRadius='full'
                                boxSize='48px'
                                src={nextPokemon?.['sprites']['other']['official-artwork']['front_default']}
                                alt='Dan Abramov'
                                fallbackSrc={egg}
                            />
                        </Button>
                    </a>
                </Stack>
                <div className="firstContainer">
                    <MainCard pokemon={pokemon} species={species} />
                    <div className="descriptionContainer">
                        <div className="descriptionTitle">
                            Description
                        </div>
                        <label className="selectLabel">Game: </label>
                        <select className="selectDescription" onChange={(ev) => setCurrentDesc(ev.target.value)}>
                            {
                                descriptions?.map((el) => <option value={el?.flavor_text}>{el?.version?.name}</option>)
                            }
                        </select>
                        <div className="currentDescriotionContainer">
                            <p>{currentDesc}</p>
                        </div>
                        <div class="descriptionTitle">Stats</div>
                        <PowersCard pokemon={pokemon} />
                    </div>
                </div>
                <div className="descriptionTitle">Evolutions</div>
                <div className="secondContainer">
                    <EvolutionsCard pokemonType={pokemonType} species={species} />
                </div>
                <div className="descriptionTitle">Sprites</div>
                <div className="secondContainer">
                    <SpritesCard pokemon={pokemon} />
                </div>
            </div>

        );
    }

    return <div>
        {pokemon && renderPokemon(pokemon)}
    </div>
}