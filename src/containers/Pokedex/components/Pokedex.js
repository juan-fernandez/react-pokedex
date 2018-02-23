import React from 'react'
import classes from './styles.css'
import PropTypes from 'prop-types'
import PokeCard from '../../../components/PokeCard'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyDrawer from './MyDrawer'
import Pagination from './Pagination'
import PokemonInfo from '../../PokemonInfo'

const Pokedex = ({...props})=>{
    const muiTheme = getMuiTheme({
        fontFamily: 'Muli, sans-serif',
        palette: {
            textColor: "#333333"
        },
    });
    const {
        pokemonList,
        searchTerm,
        onChangeTerm,
        filterValues,
        onChangeFilter,
        clearFilters,
        paginationIndex,
        paginationValue,
        onChangePaginationValue,
        onChangePaginationIndex,
        numberOfPokemon,
        typeOfFilter,
        onChangeTypeOfFilter,
        onClickPokemon,
        onRequestClosePokemon,
        openPokemonInfo,
        pokemonChosen,
    } = props
    const {
        container,
        pokemonListContainer
    } = classes
    const paginatedPokemonList = pokemonList.slice((paginationIndex-1)*paginationValue,
                                                (paginationIndex)*paginationValue)
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div
                className={container}
                >
                <MyDrawer
                    searchTerm={searchTerm}
                    onChangeTerm={onChangeTerm}
                    filterValues={filterValues}
                    onChangeFilter={onChangeFilter}
                    clearFilters={clearFilters}
                    typeOfFilter={typeOfFilter}
                    onChangeTypeOfFilter={onChangeTypeOfFilter}
                    />
                <Pagination
                    paginationIndex={paginationIndex}
                    paginationValue={paginationValue}
                    onChangePaginationValue={onChangePaginationValue}
                    onChangePaginationIndex={onChangePaginationIndex}
                    numberOfItems={numberOfPokemon}
                    />
                <PokemonInfo
                    onRequestClosePokemon={onRequestClosePokemon}
                    openPokemonInfo={openPokemonInfo}
                    pokemonChosen={pokemonChosen}
                    />
                <div
                    className={pokemonListContainer}
                    >

                    {paginatedPokemonList.map((pokemonInfo)=>(
                        <PokeCard
                            key={`pokemon-${pokemonInfo.id}`}
                            name={pokemonInfo.name}
                            types={pokemonInfo.types}
                            images={pokemonInfo.images.front_default}
                            number={pokemonInfo.id}
                            onClick={onClickPokemon}
                            />
                    ))}

                </div>
            </div>
        </MuiThemeProvider>
    )
}
Pokedex.propTypes = {

}
export default Pokedex
