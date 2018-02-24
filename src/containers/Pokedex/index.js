import React, {Component} from 'react'
import Pokedex from './components/Pokedex'
import { connect } from 'react-redux'
import {getSinglePokemon} from '../../actions/pokemonsActions'
import {filterByName, filterByType} from '../../reducers/pokemonsReducer'
import {typeToColor} from '../../utils/settings'
import {getRandomInt} from '../../utils/aux'
import {savePokemon,removePokemons} from '../../utils/localStorage'

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
            paginationValue: 30,
            paginationIndex: 1,
            typeOfFilter: 'OR',
            openPokemonInfo: false,
            pokemonChosen: -1,
            fetching: false,
            fetchingIndex: -1,
            missingPokemon: []
        }
    }
    onClickPokemon = (number)=>{
        this.setState({
            pokemonChosen: number,
            openPokemonInfo: true,
        })
        this.stopFetchingPokemon() // we stop the fetching while looking at a pokemon
    }
    onRequestClosePokemon = ()=>{
        this.setState({
            openPokemonInfo: false,
            pokemonChosen: -1,
        })
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
    onChangeTypeOfFilter = (newValue)=>{
        this.setState({
            typeOfFilter: newValue
        })
    }
    clearFilters = ()=>{
        let filterValues = {}
        Object.keys(typeToColor).forEach(key=>{
            filterValues[key] = false
        })
        this.setState({
            searchTerm: "",
            filterValues:filterValues,
            paginationIndex: 1,
            typeOfFilter: 'OR'
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
            paginationValue: newValue,
            paginationIndex: 1
        })
    }
    onChangePaginationIndex = (newValue)=>{
        this.setState({
            paginationIndex: newValue
        })
    }
    componentWillReceiveProps(nextProps){
        if (Object.keys(nextProps.pokemons).length !== Object.keys(this.props.pokemons).length){
            // saving in local storage
            savePokemon(JSON.stringify(nextProps.pokemons))
            if (this.state.fetching){
                let indexToFetch = this.state.fetchingIndex +1
                this.props.getSinglePokemon(this.state.missingPokemon[indexToFetch])
                this.setState({
                    fetchingIndex: indexToFetch
                })
            }
        }
    }
    periodicallyFetchPokemon = ()=>{
        // only fetch the ones we do not have
        const missingPokemon = Array.from(Array(152).keys()) // array from 0 to 150
                                .filter((number)=>
                                    Object.keys(this.props.pokemons).indexOf(number.toString()) == -1)
        let index = 1
        this.props.getSinglePokemon(missingPokemon[index])
        this.setState({
            fetching: true,
            fetchingIndex: index,
            missingPokemon: missingPokemon,
        })
    }
    stopFetchingPokemon = ()=>{
        this.setState({
            fetching: false,
            fetchingIndex: -1,
            missingPokemon: []
        })
    }
    clearLocalStorage = ()=>{
        removePokemons()
    }


    render(){
        const {
            paginationIndex,
            paginationValue
        } = this.state
        const selectedFilters = Object.keys(this.state.filterValues).filter((filterValue)=>(
            this.state.filterValues[filterValue]
        ))
        const filteredPokemonList = filterByType(this.state.typeOfFilter,selectedFilters,
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
                typeOfFilter={this.state.typeOfFilter}
                onChangeTypeOfFilter={this.onChangeTypeOfFilter}
                onClickPokemon={this.onClickPokemon}
                onRequestClosePokemon={this.onRequestClosePokemon}
                openPokemonInfo={this.state.openPokemonInfo}
                pokemonChosen={this.state.pokemonChosen}
                clearLocalStorage={this.clearLocalStorage}
                startFetching={this.periodicallyFetchPokemon}
                stopFetching={this.stopFetchingPokemon}
                fetching={this.state.fetching}
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
