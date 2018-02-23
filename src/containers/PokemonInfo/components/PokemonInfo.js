import React from 'react'
import classes from './styles.css'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'

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
        header
    } = classes

    return (
        <Dialog
            onRequestClose={onRequestClose}
            open={open}
            >
            {open && <div
                className={container}>
                <div
                    className={header}>
                    {basicInfo.name}
                </div>
            </div>}
        </Dialog>
    )
}
PokemonInfo.propTypes = {

}
export default PokemonInfo
