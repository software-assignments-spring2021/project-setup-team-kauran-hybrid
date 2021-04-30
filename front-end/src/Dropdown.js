import React from 'react'
import './Dropdown.css'
import { StyledDropdown } from './Dropdown.styled';
import { bool, func } from 'prop-types';


const Dropdown=({ open, setOpen })=>{
    return(
        <StyledDropdown open={open} onClick={() => setOpen(!open)}>
            <div />
            <div />
            <div />
        </StyledDropdown>
    )
}
Dropdown.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
};
export default Dropdown;