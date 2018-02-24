import {pokemonFunctions as api} from '../utils/api'

export const getSinglePokemon = id=> dispatch => {
    dispatch(getSinglePokemonRequested())
    return api.getSinglePokemon(id)
        .then(
            response=>{
                dispatch(getSinglePokemonReceived(response.data))
            }
        )
        .catch(
            err => {
                dispatch(getSinglePokemonFailed(err))
            }
        )
}
const getSinglePokemonRequested = ()=>({
    type: 'GET_SINGLE_POKEMON_REQUESTED'
})
const getSinglePokemonReceived = pokemonInfo=>({
    type: 'GET_SINGLE_POKEMON_RECEIVED',
    pokemonInfo
})
const getSinglePokemonFailed = serverResponse=>({
    type: 'GET_SINGLE_POKEMON_FAILED',
    serverResponse
})

export const getPokemonSpecies = url=> dispatch => {
    dispatch(getPokemonSpeciesRequested())
    return api.getPokemonSpecies(url)
        .then(
            response=>{
                dispatch(getPokemonSpeciesReceived(response.data))
            }
        )
        .catch(
            err => {
                dispatch(getPokemonSpeciesFailed(err))
            }
        )
}
const getPokemonSpeciesRequested = ()=>({
    type: 'GET_POKEMON_SPECIES_REQUESTED'
})
const getPokemonSpeciesReceived = pokemonSpecies=>({
    type: 'GET_POKEMON_SPECIES_RECEIVED',
    pokemonSpecies
})
const getPokemonSpeciesFailed = serverResponse=>({
    type: 'GET_POKEMON_SPECIES_FAILED',
    serverResponse
})

export const getEvolutionChain = url=> dispatch => {
    dispatch(getEvolutionChainRequested())
    return api.getEvolutionChain(url)
        .then(
            response=>{
                dispatch(getEvolutionChainReceived(response.data))
            }
        )
        .catch(
            err => {
                dispatch(getEvolutionChainFailed(err))
            }
        )
}
const getEvolutionChainRequested = ()=>({
    type: 'GET_EVOLUTION_CHAIN_REQUESTED'
})
const getEvolutionChainReceived = evolutionChain=>({
    type: 'GET_EVOLUTION_CHAIN_RECEIVED',
    evolutionChain
})
const getEvolutionChainFailed = serverResponse=>({
    type: 'GET_EVOLUTION_CHAIN_FAILED',
    serverResponse
})
