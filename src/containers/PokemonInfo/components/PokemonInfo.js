import React from 'react'
import classes from './styles.css'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import {typeToColor} from '../../../utils/settings'
import Loader from 'react-loader'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

const PokemonInfo = ({...props})=>{
    const {
        ajax,
        open,
        fullPokemonInfo,
        basicInfo,
        onRequestClose,
        evolutionChain,
        fetchingEvolutionChain,
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
        typeInfo,
        evolutionContainer,
        evolutionHeader,
        evolutionContent,
        pokemonChainContainer,
        pokemonChain,
        evolutionLoaded
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
                        <div
                            className={evolutionContainer}
                            >

                            <div
                                className={evolutionHeader}
                                style={{backgroundColor:typeToColor[basicInfo.types[0]]}}
                                >
                                Evolution Info
                            </div>

                            <div
                                className={evolutionContent}
                                >
                                <Loader
                                    loaded={!fetchingEvolutionChain}
                                    loadedClassName={evolutionLoaded}>
                                    {evolutionChain.map((pokemon,index)=>(
                                        <div
                                            key={`evolutionChain-${pokemon}`}
                                            className={pokemonChainContainer}
                                            >
                                            <div
                                                className={pokemonChain}
                                                style={pokemon==basicInfo.name  ? {
                                                    color:'white',
                                                    fontWeight:'800',
                                                    backgroundColor:typeToColor[basicInfo.types[0]]
                                                }:{}}>
                                                {pokemon}
                                            </div>
                                            {(index < evolutionChain.length -1) && <HardwareKeyboardArrowRight/>}
                                        </div>
                                    ))}
                                </Loader>
                            </div>


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
