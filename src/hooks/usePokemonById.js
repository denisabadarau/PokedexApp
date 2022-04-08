import { useState, useEffect } from "react";
import axios from "axios";

function usePokemonById(id) {
    const [pokemon, setPokemon] = useState();
    const [error, setError] = useState();
    const [pending, setIsPending] = useState(true);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const getPokemon = async () => {
        try {
            const response = await axios.get(url);
            setPokemon(response.data);
            setIsPending(false);
        } catch (err) {
            setError(err);
            setIsPending(false);
        }
    }

    useEffect(() => {
        getPokemon();
    }, [url]);

    return { pokemon, error, pending };
}

export default usePokemonById;