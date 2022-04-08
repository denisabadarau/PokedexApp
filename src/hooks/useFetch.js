import { useState, useEffect } from "react";
import axios from "axios";

function useFetch() {
    const [pokemons, setPokemons] = useState([]);
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=21')
    const [error, setError] = useState();
    const [isPending, setIsPending] = useState(true);

    const getAllPokemons = async () => {
        try {
            const response = await axios.get(loadMore);

            let myPromiseArray = [];
            response.data.results.forEach(async (element) => {
                myPromiseArray.push(axios.get(element.url))
            });

            const resp = await Promise.all(myPromiseArray);
            const poke = resp.map(el => el.data)
            setPokemons([...pokemons, ...poke]);
            setLoadMore(response.data.next);
            setIsPending(false);
        } catch (err) {
            setError(err)
            setIsPending(false)
        }
    }

    useEffect(() => {
        getAllPokemons();
    }, []);

    return { pokemons, error, getAllPokemons };
}

export default useFetch;