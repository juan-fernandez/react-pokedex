import React from 'react'
import classes from './styles.css'
import PropTypes from 'prop-types'
import PokemonInfo from '../../components/PokemonInfo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MyDrawer from './MyDrawer'


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
        clearFilters
    } = props
    const {
        container,
        pokemonListContainer
    } = classes
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
                    />
                <div
                    className={pokemonListContainer}
                    >

                    {pokemonList.map((pokemonInfo)=>(
                        <PokemonInfo
                        key={`pokemon-${pokemonInfo.id}`}
                        name={pokemonInfo.name}
                        type={pokemonInfo.type}
                        images={pokemonInfo.images.front_default}
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
