import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.css'
import {typeToColor} from '../../../utils/settings'

const PokemonInfo = ({...props})=>{
    const {
        name,
        types,
        images
    } = props
    const {
        container,
        nameContainer,
        typeBackground,
        backGroundContainer
    } = classes
    return (
        <div
            className={container}
            >
            <div
                className={backGroundContainer}
                >
                {types.map((type,index)=>(
                    <div
                        key={`${name}-type-${index}`}
                        className={typeBackground}
                        style={{backgroundColor:typeToColor[type]}}
                        >
                    </div>
                ))}
            </div>
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
