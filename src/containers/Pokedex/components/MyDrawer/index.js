import React from 'react'
import classes from './styles.css'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Drawer from 'material-ui/Drawer'
import Search from 'material-ui/svg-icons/action/search'
import Checkbox from 'material-ui/Checkbox'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete'

const MyDrawer = ({...props})=>{
    const {
        searchTerm,
        onChangeTerm,
        filterValues,
        onChangeFilter,
        clearFilters
    } = props
    const {
        container,
        brandContainer,
        searchContainer,
        filterContainer,
        textField
    } = classes
    return (
        <div
            className={container}
            >
            <div
                className={brandContainer}
                >
                Pokédex
            </div>
            <div className={searchContainer}>
                <Search/>
                <TextField
                    className={textField}
                    underlineStyle={{display: 'none'}}
                    hintText="Search for a Pokémon"
                    value={searchTerm}
                    onChange={(event)=>onChangeTerm(event.target.value)}
                />
            </div>
            <div
                className={filterContainer}
                >
                <Subheader>
                    FILTERS
                </Subheader>
                <Checkbox
                    label='Fire'
                    checked={filterValues.fire}
                    onCheck={(event,isChecked)=>onChangeFilter('fire',isChecked)}
                    />
                <RaisedButton
                    style={{marginTop:'10px'}}
                    onClick={clearFilters}
                    label='Clear filters'
                    icon={<Delete/>}
                />
            </div>

        </div>
    )
}
MyDrawer.propTypes = {

}
export default MyDrawer
