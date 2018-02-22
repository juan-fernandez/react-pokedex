import React from 'react'
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'
import classes from './styles.css'

const PokemonInfo = ({...props})=>{
    const {
        name,
        type,
        images
    } = props
    const {
        container
    } = classes
    return (
        <Paper
            className={container}
            >
            {name}
            <img src={images} alt="" />
        </Paper>
    )
}
PokemonInfo.propTypes = {

}
export default PokemonInfo
