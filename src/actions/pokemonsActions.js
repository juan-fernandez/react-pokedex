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
