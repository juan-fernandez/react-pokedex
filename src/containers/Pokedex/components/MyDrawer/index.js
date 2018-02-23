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
import {typeToColor} from '../../../../utils/settings'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


const MyDrawer = ({...props})=>{
    const {
        searchTerm,
        onChangeTerm,
        filterValues,
        onChangeFilter,
        clearFilters,
        typeOfFilter,
        onChangeTypeOfFilter,
    } = props
    const {
        container,
        brandContainer,
        searchContainer,
        filterContainer,
        textField,
        radioButtons
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
                <RadioButtonGroup
                    className={radioButtons}
                    name="typeOfFilter"
                    valueSelected={typeOfFilter}
                    onChange={(event,value)=>onChangeTypeOfFilter(value)}
                    >
                    <RadioButton
                        value="OR"
                        label="OR"
                        />
                    <RadioButton
                        value="AND"
                        label="AND"
                        />
                </RadioButtonGroup>


                {
                    Object.keys(filterValues).map((key)=>(
                        <Checkbox
                            style={{textTransform:'capitalize'}}
                            labelStyle={{color:typeToColor[key] }}
                            iconStyle={{fill:typeToColor[key]}}
                            key={key}
                            label={key}
                            checked={filterValues[key]}
                            onCheck={(event,isChecked)=>onChangeFilter(key,isChecked)}
                            />
                    ))
                }

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
