import React, {Component} from 'react'
import Proptypes from 'prop-types'
import Pokedex from './components/Pokedex'

class PokedexContainer extends Component {
    render(){
        return (
            <Pokedex/>
        )
    }
}
PokedexContainer.propTypes = {

}
export default PokedexContainer
