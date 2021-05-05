import React from 'react';
import { bool } from 'prop-types';
import { StyledDropdownMenu } from './DropdownMenu.styled';

const DropdownMenu = ({ open }) => {
  return (
    <StyledDropdownMenu open={open}>
      <a classname='dropdown' href="/">
        <span role="img" aria-label="home"></span>
        Home
      </a>
      <a classname='dropdown' href="/Account">
        <span role="img" aria-label="my account"></span>
        My Account
        </a>
      <a classname='dropdown' href="/Login">
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