import React from 'react'
import classes from './styles.css'
// select pagination size
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import PropTypes from 'prop-types'


const Pagination = ({...props})=>{
    const {
        paginationIndex,
        paginationValue,
        onChangePaginationValue,
        onChangePaginationIndex,
        numberOfItems
    } = props
    const {
        container
    } = classes
    return (
        <div className={container}>

            <SelectField
                floatingLabelText='Page Size'
                value={paginationValue}
                style={{width:'100px',marginBottom:'20px'}}
                onChange={(event,index,value)=>onChangePaginationValue(value)}
            >
                <MenuItem value={5} primaryText="5" />
                <MenuItem value={10} primaryText="10" />
            </SelectField>

            <HardwareKeyboardArrowLeft
                style={{cursor:'pointer'}}
                onClick={()=>paginationIndex === 1 ? undefined:onChangePaginationIndex(paginationIndex-1)}
                />
            <div style={{width:'120px',textAlign:'center'}}>
                Page {paginationIndex}/{numberOfItems%paginationValue === 0 ? (numberOfItems===0 ? '1':numberOfItems/paginationValue): Math.floor(numberOfItems/paginationValue)+1}
            </div>
            <HardwareKeyboardArrowRight
                style={{cursor:'pointer'}}
                onClick={()=>paginationIndex === (numberOfItems%paginationValue === 0 ? numberOfItems/paginationValue:Math.floor(numberOfItems/paginationValue)+1) ? undefined:onChangePaginationIndex(paginationIndex+1)}
            />
            <div>
                {numberOfItems} Pokémon found
            </div>
        </div>
    )
}
Pagination.propTypes = {

}
export default Pagination
