import React from 'react'
import PropTypes from 'prop-types'
import classes from './styles.css'
import {typeToColor} from '../../utils/settings'

const PokeCard = ({...props})=>{
    const {
        number,
        name,
        types,
        images,
        onClick
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
            onClick={()=>onClick(number)}
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
PokeCard.propTypes = {

}
export default PokeCard
