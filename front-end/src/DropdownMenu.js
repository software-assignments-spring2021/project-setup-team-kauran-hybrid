import React from 'react';
import { bool } from 'prop-types';
import { StyledDropdownMenu } from './DropdownMenu.styled';

const DropdownMenu = ({ open }) => {
  return (
    <StyledDropdownMenu open={open}>
      <a href="/">
        <span role="img" aria-label="home"></span>
        Home
      </a>
      <a href="/Account">
        <span role="img" aria-label="my account"></span>
        My Account
        </a>
      <a href="/Login">
        <span role="img" aria-label="login/logout"></span>
        Login
        </a>
    </StyledDropdownMenu>
  )
}
DropdownMenu.propTypes = {
    open: bool.isRequired,
  }
export default DropdownMenu;