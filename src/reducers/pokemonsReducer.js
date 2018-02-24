import { combineReducers } from "redux"

// selectors
export const getPokemonsAsArray = (pokemons)=>
    Object.keys(pokemons).map((key)=>pokemons[key])

export const filterByName = (name,pokemons)=>
    getPokemonsAsArray(pokemons).filter((pokemon)=>(
        pokemon.name.startsWith(name)
    ))

// selectedTypes is an array of selected types in string
export const filterByType = (typeOfFilter,selectedTypes, pokemons)=>
    pokemons.filter((pokemon)=>(
        selectedTypes.length === 0 ||
        (typeOfFilter=='OR' ?
        pokemon.types.some((pokeType)=>selectedTypes.indexOf(pokeType)!==-1):
        selectedTypes.every((selected)=>pokemon.types.indexOf(selected)!==-1))
    ))


const parseChain = (currentChain,result)=>{
    result.push(currentChain.species.name)
    if(currentChain.evolves_to.length == 0){
        return result
    }else{
        // only evolves_to[0], otherwise it gets a bit complicated
        return parseChain(currentChain.evolves_to[0], result)
    }
}

export const getEvolutionArray = (evolutionChain)=>
    parseChain(evolutionChain,[])



// reducers
const ajax = (state={
    single: {
        fetching: false,
        fetched: false,
        success: false,
        errorMessage: ""
    },
    pokemonSpecies:{
        fetching: false,
        fetched: false,
        success: false,
        errorMessage: ""
    },
    evolutionChain:{
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
        case 'GET_POKEMON_SPECIES_REQUESTED':
            return {
                ...state,
                pokemonSpecies: {
                    fetching: true,
                    fetched: false,
                    success: false,
                    errorMessage: ""
                }
            }
        case 'GET_POKEMON_SPECIES_FAILED':
            return {
                ...state,
                pokemonSpecies: {
                    fetching: false,
                    fetched: true,
                    success: false,
                    errorMessage: action.serverResponse
                }
            }
        case 'GET_POKEMON_SPECIES_RECEIVED':
            return {
                ...state,
                pokemonSpecies: {
                    fetching: false,
                    fetched: true,
                    success: true,
                    errorMessage: ""
                }
            }
        case 'GET_EVOLUTION_CHAIN_REQUESTED':
            return {
                ...state,
                evolutionChain: {
                    fetching: true,
                    fetched: false,
                    success: false,
                    errorMessage: ""
                }
            }
        case 'GET_EVOLUTION_CHAIN_FAILED':
            return {
                ...state,
                evolutionChain: {
                    fetching: false,
                    fetched: true,
                    success: false,
                    errorMessage: action.serverResponse
                }
            }
        case 'GET_EVOLUTION_CHAIN_RECEIVED':
            return {
                ...state,
                evolutionChain: {
                    fetching: false,
                    fetched: true,
                    success: true,
                    errorMessage: ""
                }
            }
    }
    return state
}

const pokemonSpeciesInfo = (state={},action)=>{
    switch(action.type){
        case 'GET_POKEMON_SPECIES_RECEIVED':
            return action.pokemonSpecies
    }
    return state
}

const evolutionChains = (state={},action)=>{
    switch(action.type){
        case 'GET_EVOLUTION_CHAIN_RECEIVED':
            let newChain = {...state}
            newChain[action.evolutionChain.id] = action.evolutionChain.chain
            return newChain
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
                    // order by slot and we only keep the info we need
                    types: action.pokemonInfo.types.sort((a,b)=>a.slot - b.slot).map((pokeTypeInfo)=>pokeTypeInfo.type.name),
                    images: action.pokemonInfo.sprites,
                    speciesUrl: action.pokemonInfo.species.url
                }
            }
    }
    return state
}
export default combineReducers({
	pokemons,
	ajax,
    pokemonSpeciesInfo,
    evolutionChains
})
