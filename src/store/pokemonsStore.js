import { React, createContext } from "react";
import useFetch from "../hooks/useFetch";

const PokemonsStore = createContext({})

export const PokemonsStoreProvider = ({ children }) => {
    const { pokemons, error, getAllPokemons } = useFetch();

    return <PokemonsStore.Provider value={{
        pokemons,
        error,
        getAllPokemons
    }}>
        {children}
    </PokemonsStore.Provider>
}
export default PokemonsStore;