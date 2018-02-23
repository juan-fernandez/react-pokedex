import React, {Component} from 'react'
import Pokedex from './components/Pokedex'
import { connect } from 'react-redux'
import {getSinglePokemon} from '../../actions/pokemonsActions'
import {filterByName, filterByType} from '../../reducers/pokemonsReducer'
import {typeToColor} from '../../utils/settings'
import {getRandomInt} from '../../utils/aux'


class PokedexContainer extends Component {
    constructor(props){
        super(props)
        let filterValues = {}
        Object.keys(typeToColor).forEach(key=>{
            filterValues[key] = false
        })
        this.state={
            searchTerm: "",
            filterValues: filterValues,
            paginationValue: 5,
            paginationIndex: 1
        }
    }
    onChangeFilter = (id,newValue)=>{
        this.setState((currentState)=>({
            filterValues: {
                ...currentState.filterValues,
                [id]:newValue
            },
            paginationIndex: 1
        }))
    }
    clearFilters = ()=>{
        let filterValues = {}
        Object.keys(typeToColor).forEach(key=>{
            filterValues[key] = false
        })
        this.setState({
            searchTerm: "",
            filterValues:filterValues,
            paginationIndex: 1
        })
    }
    onChangeTerm = (newTerm)=>{
        this.setState({
            searchTerm: newTerm,
            paginationIndex: 1
        })
    }
    onChangePaginationValue = (newValue)=>{
        this.setState({
            paginationValue: newValue
        })
    }
    onChangePaginationIndex = (newValue)=>{
        this.setState({
            paginationIndex: newValue
        })
    }
    componentWillMount(){
        let index = 1
        this.petition_interval = setInterval(()=>{
            // add local storage and keep refreshing but slowly
            if(index < 10){
                this.props.getSinglePokemon(getRandomInt(1,150))
                index= index+1
            }else{
                clearInterval(this.petition_interval)
            }
        },500)
    }
    render(){
        const {
            paginationIndex,
            paginationValue
        } = this.state
        const selectedFilters = Object.keys(this.state.filterValues).filter((filterValue)=>(
            this.state.filterValues[filterValue]
        ))
        const filteredPokemonList = filterByType(selectedFilters,
                                    filterByName(this.state.searchTerm,
                                                 this.props.pokemons))

        return (
            <Pokedex
                pokemonList={filteredPokemonList}
                searchTerm={this.state.searchTerm}
                onChangeTerm={this.onChangeTerm}
                filterValues={this.state.filterValues}
                onChangeFilter={this.onChangeFilter}
                clearFilters={this.clearFilters}
                paginationIndex={this.state.paginationIndex}
                paginationValue={this.state.paginationValue}
                onChangePaginationValue={this.onChangePaginationValue}
                onChangePaginationIndex={this.onChangePaginationIndex}
                numberOfPokemon={filteredPokemonList.length}
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
