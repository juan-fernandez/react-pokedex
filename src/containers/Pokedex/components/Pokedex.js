import React from 'react'
import classes from './styles.css'
import PropTypes from 'prop-types'
import PokeCard from '../../../components/PokeCard'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyDrawer from './MyDrawer'
import Pagination from './Pagination'
import PokemonInfo from '../../PokemonInfo'
import Fetcher from './Fetcher'
import TextField from 'material-ui/TextField'
import {typeToColor} from '../../../utils/settings'
import Checkbox from 'material-ui/Checkbox'

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
        clearLocalStorage,
        startFetching,
        stopFetching,
        fetching
    } = props
    const {
        container,
        pokemonListContainer,
        appBar,
        searchContainerResponsive,
        filterContainerResponsive
    } = classes
    const paginatedPokemonList = pokemonList.slice((paginationIndex-1)*paginationValue,
                                                (paginationIndex)*paginationValue)
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            <div
                className={container}
                >
                <div
                    className={searchContainerResponsive}
                    >
                    <TextField
                        hintText="Search for a Pokémon"
                        value={searchTerm}
                        onChange={(event)=>onChangeTerm(event.target.value)}
                        fullWidth={true}/>
                </div>

                <MyDrawer
                    searchTerm={searchTerm}
                    onChangeTerm={onChangeTerm}
                    filterValues={filterValues}
                    onChangeFilter={onChangeFilter}
                    clearFilters={clearFilters}
                    typeOfFilter={typeOfFilter}
                    onChangeTypeOfFilter={onChangeTypeOfFilter}
                    />
                <Fetcher
                    clearLocalStorage={clearLocalStorage}
                    startFetching={startFetching}
                    stopFetching={stopFetching}
                    fetching={fetching}
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
                            image={pokemonInfo.images.front_default}
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
