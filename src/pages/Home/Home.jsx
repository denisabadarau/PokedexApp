import { React, useContext, useState } from "react";
import PokemonsStore from "../../store/pokemonsStore";

import PokemonCard from "../../components/Cards/PokemonCard/PokemonCard";
import SearchBar from "../../components/SearchBar/SearchBar";

import { Button } from "@chakra-ui/react";
import Grid from '@material-ui/core/Grid';

import './Home.css';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');

    const { pokemons, getAllPokemons } = useContext(PokemonsStore);

    const renderPokemonCard = pokemons.filter((val) => {
        if (searchTerm === "") {
            return val;
        } else if (val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
            return val;
        }
    }).map((pokemon) => (
        <Grid item key={pokemon.id} xs={12} md={6} lg={4}>
            <a href={`/pokemon/${pokemon.id}`}>
                <PokemonCard pokemon={pokemon} />
            </a>
        </Grid>
    ));

    return (
        <>
            <SearchBar
                placeholder="Search pokemon name..."
                handleChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />
            <Grid container>
                {renderPokemonCard}
            </Grid>
            <Button
                colorScheme='teal'
                variant='outline'
                onClick={() => getAllPokemons()}
            >
                Load more
            </Button>
        </>
    );
}