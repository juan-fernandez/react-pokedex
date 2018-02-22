import axios from 'axios'

export const setBaseUrl = (baseURL)=>{
    axios.defaults.baseURL = baseURL
}
const endpoints = {
    pokemon: {
        all: 'pokemon/',
        single: (id)=>`pokemon/${id}/`
    }
}

const getSinglePokemon = (id)=>
    axios.get(endpoints.pokemon.single(id))

const getAllPokemon = (id)=>
    axios.get(endpoints.pokemon.all)

export const pokemonFunctions = {
    getSinglePokemon,
    getAllPokemon
}
