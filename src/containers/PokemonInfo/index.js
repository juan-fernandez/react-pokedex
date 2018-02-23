import React, {Component} from 'react'
import PokemonInfo from './components/PokemonInfo'
import { connect } from 'react-redux'
import {typeToColor} from '../../utils/settings'
import {getSinglePokemon} from '../../actions/pokemonsActions'

class PokemonInfoContainer extends Component {

    componentWillReceiveProps(nextProps){
        if (nextProps.openPokemonInfo && !this.props.openPokemonInfo){
            // we refresh it
            this.props.getSinglePokemon(nextProps.pokemonChosen)
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
        singlePokemonFullInfo: state.pokemons.singlePokemonFullInfo,
        pokemons: state.pokemons.pokemons,
	}
)


export default connect(mapStateToProps,{getSinglePokemon})(PokemonInfoContainer)
