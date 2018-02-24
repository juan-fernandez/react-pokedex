
export const loadPokemon = () => {
    try {
		const pokemonList = window.localStorage.getItem('pokemonList')
		if (pokemonList){
			return JSON.parse(pokemonList)
		} else{
			return undefined
		}
	}
	catch (err){
		return undefined
	}
}
export const removePokemons = () => {
	try {
		window.localStorage.removeItem('pokemonList')
	}catch(err){
		console.error(err)
	}
}
export const savePokemon = (pokemonList) => {
    //debugger
	try {
		window.localStorage.setItem('pokemonList',pokemonList)
	}catch(err){
		console.error(err)
	}
}
