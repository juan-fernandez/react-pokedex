import React, {Component} from 'react'
import PokemonInfo from './components/PokemonInfo'
import { connect } from 'react-redux'
import {typeToColor} from '../../utils/settings'
import {getSinglePokemon,getPokemonSpecies,getEvolutionChain} from '../../actions/pokemonsActions'
import {getEvolutionArray} from '../../reducers/pokemonsReducer'

class PokemonInfoContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            evolutionChain: [],
            fetchingEvolutionChain: true,
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.openPokemonInfo && !this.props.openPokemonInfo){
            // we refresh it
            this.props.getSinglePokemon(nextProps.pokemonChosen)
        }else if(nextProps.ajaxSinglePokemon.fetched && !this.props.ajaxSinglePokemon.fetched){
            // we just got the info of that pokemon
            if (nextProps.ajaxSinglePokemon.success){
                this.props.getPokemonSpecies(nextProps.singlePokemonFullInfo.species.url)
            }
        }else if(nextProps.ajaxPokemonSpecies.fetched && !this.props.ajaxPokemonSpecies.fetched){
            if (nextProps.ajaxPokemonSpecies.success){
                this.props.getEvolutionChain(nextProps.pokemonSpeciesInfo.evolution_chain.url)
            }
        }else if(nextProps.ajaxEvolutionChain.fetched && !this.props.ajaxEvolutionChain.fetched){
            if (nextProps.ajaxEvolutionChain.success){
                this.setState({
                    evolutionChain:  getEvolutionArray(nextProps.evolutionChainInfo),
                    fetchingEvolutionChain: false
                })
            }
        }
    }
    render(){
        return (
            <PokemonInfo
                open={this.props.openPokemonInfo}
                fullPokemonInfo={this.props.singlePokemonFullInfo}
                basicInfo={this.props.pokemons[this.props.pokemonChosen]}
                onRequestClose={this.props.onRequestClosePokemon}
                ajax={this.props.ajaxSinglePokemon}
                />
        )
    }
}
const mapStateToProps = (state)=>(
	{
		ajaxSinglePokemon: state.pokemons.ajax.single,
        ajaxPokemonSpecies: state.pokemons.ajax.pokemonSpecies,
        ajaxEvolutionChain: state.pokemons.ajax.evolutionChain,
        singlePokemonFullInfo: state.pokemons.singlePokemonFullInfo,
        pokemonSpeciesInfo: state.pokemons.pokemonSpeciesInfo,
        evolutionChainInfo: state.pokemons.evolutionChainInfo,
        pokemons: state.pokemons.pokemons,
	}
)


export default connect(mapStateToProps,{getSinglePokemon,getPokemonSpecies,getEvolutionChain})(PokemonInfoContainer)
