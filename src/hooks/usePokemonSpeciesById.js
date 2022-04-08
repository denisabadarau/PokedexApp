import { useState, useEffect } from "react";
import axios from "axios";

function usePokemonSpeciesById(id) {
    const [species, setSpecies] = useState();
    const [error, setError] = useState();
    const [pending, setIsPending] = useState(true);
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    const getSpecies = async () => {
        try {
            const response = await axios.get(url);
            setSpecies(response.data);
            setIsPending(false);
        } catch (err) {
            setError(err);
            setIsPending(false);
        }
    }

    useEffect(() => {
        getSpecies();
    }, [url]);

    return { species, error, pending };

}

export default usePokemonSpeciesById;