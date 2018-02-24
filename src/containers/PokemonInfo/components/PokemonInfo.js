import React from 'react'
import classes from './styles.css'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import {typeToColor} from '../../../utils/settings'


const PokemonInfo = ({...props})=>{
    const {
        ajax,
        open,
        fullPokemonInfo,
        basicInfo,
        onRequestClose
    } = props
    const {
        container,
        header,
        body,
        generalInfo,
        listContainer,
        number,
        imagesContainer,
        typeContainer,
        typeInfo
    } = classes

    return (
        <Dialog
            bodyStyle={{padding:'0px'}}
            onRequestClose={onRequestClose}
            open={open}
            >
            {open &&
            <div
                className={container}>
                <div
                    className={header}
                    style={{backgroundColor:typeToColor[basicInfo.types[0]]}}>
                    {basicInfo.name}
                </div>
                <div
                    className={body}>
                    <div
                        className={generalInfo}>
                        <div
                            className={number}
                            >
                            {`#${basicInfo.id}`}
                        </div>
                        <div
                            className={imagesContainer}
                            >
                            <img width='160px' height='160px' src={basicInfo.images.front_default} alt=""/>
                            <img width='160px' height='160px' src={basicInfo.images.back_default} alt=""/>
                            <img width='160px' height='160px' src={basicInfo.images.front_shiny} alt=""/>
                            <img width='160px' height='160px' src={basicInfo.images.back_shiny} alt=""/>
                        </div>
                        <div
                            className={typeContainer}
                            >
                            {basicInfo.types.map((type)=>(
                                <div
                                    key={`type-single-info-${type}`}
                                    className={typeInfo}
                                    style={{backgroundColor:typeToColor[type]}}
                                    >
                                    {type}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>}
        </Dialog>
    )
}
PokemonInfo.propTypes = {

}
export default PokemonInfo
