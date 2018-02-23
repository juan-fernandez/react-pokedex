import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.css'

const PokemonInfo = ({...props})=>{
    const {
        name,
        type,
        images
    } = props
    const {
        container,
        nameContainer
    } = classes
    return (
        <div
            className={container}
            >
            <img width='150px' height='150px' src={images} alt=""/>
            <div
                className={nameContainer}
                >
                {name}
            </div>
        </div>
    )
}
PokemonInfo.propTypes = {

}
export default PokemonInfo
