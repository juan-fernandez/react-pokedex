import React, {Component} from 'react'
import Pokedex from './components/Pokedex'
import { connect } from 'react-redux'
import {getSinglePokemon} from '../../actions/pokemonsActions'
import {getPokemonsAsArray,filterByName} from '../../reducers/pokemonsReducer'

class PokedexContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            searchTerm: "",
            filterValues: {
                fire: false,
            }
        }
    }
    onChangeFilter = (id,newValue)=>{
        this.setState((currentState)=>({
            filterValues: {
                ...currentState.filterValues,
                [id]:newValue
            }
        }))
    }
    clearFilters = ()=>{
        this.setState({
            filterValues:{
                fire:false
            }
        })
    }
    onChangeTerm = (newTerm)=>{
        this.setState({
            searchTerm: newTerm
        })
    }
    componentWillMount(){
        let index = 1
        this.petition_interval = setInterval(()=>{
            // add local storage and keep refreshing but slowly
            if(index < 7){
                this.props.getSinglePokemon(index)
                index= index+1
            }else{
                clearInterval(this.petition_interval)
            }
        },500)
    }
    render(){
        const filteredPokemonList = filterByName(this.state.searchTerm,
                                    this.props.pokemons)
        return (
            <Pokedex
                pokemonList={filteredPokemonList}
                searchTerm={this.state.searchTerm}
                onChangeTerm={this.onChangeTerm}
                filterValues={this.state.filterValues}
                onChangeFilter={this.onChangeFilter}
                clearFilters={this.clearFilters}
                />
        )
    }
}
const mapStateToProps = (state)=>(
	{
		ajaxSinglePokemon: state.pokemons.ajax.single,
        pokemons: state.pokemons.pokemons
	}
)


export default connect(mapStateToProps,{getSinglePokemon})(PokedexContainer)
