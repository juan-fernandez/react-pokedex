import { combineReducers } from "redux"

// selectors
export const getPokemonsAsArray = (pokemons)=>
    Object.keys(pokemons).map((key)=>pokemons[key])

export const filterByName = (name,pokemons)=>
    getPokemonsAsArray(pokemons).filter((pokemon)=>(
        pokemon.name.startsWith(name)
    ))


// reducers
const ajax = (state={
    single: {
        fetching: false,
        fetched: false,
        success: false,
        errorMessage: ""
    }
},action)=>{
    switch (action.type){
        case 'GET_SINGLE_POKEMON_REQUESTED':
            return {
                ...state,
                single: {
                    fetching: true,
                    fetched: false,
                    success: false,
                    errorMessage: ""
                }
            }
        case 'GET_SINGLE_POKEMON_FAILED':
            return {
                ...state,
                single: {
                    fetching: false,
                    fetched: true,
                    success: false,
                    errorMessage: action.serverResponse
                }
            }
        case 'GET_SINGLE_POKEMON_RECEIVED':
            return {
                ...state,
                single: {
                    fetching: false,
                    fetched: true,
                    success: true,
                    errorMessage: ""
                }
            }
    }
    return state
}

const pokemons = (state={}, action)=>{
    switch (action.type){
        case 'GET_SINGLE_POKEMON_RECEIVED':
            return {
                ...state,
                [action.pokemonInfo.id]: { // we only get the info we want
                    ...state[action.pokemonInfo.id],
                    id: action.pokemonInfo.id,
                    name: action.pokemonInfo.name,
                    types: action.pokemonInfo.types,
                    images: action.pokemonInfo.sprites,
                }
            }
    }
    return state
}
export default combineReducers({
	pokemons,
	ajax,
})
