import React from 'react';
import { bool } from 'prop-types';
import { StyledDropdownMenu } from './DropdownMenu.styled';

const DropdownMenu = ({ open }) => {
  return (
    <StyledDropdownMenu open={open}>
      <a href="/">
        <span role="img" aria-label="home">&#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;</span>
        Home
      </a>
      <a href="/">
        <span role="img" aria-label="my account">&#x1f4b8;</span>
        My Account
        </a>
      <a href="/">
        <span role="img" aria-label="login/logout">&#x1f4e9;</span>
        Login
        </a>
    </StyledDropdownMenu>
  )
}
DropdownMenu.propTypes = {
    open: bool.isRequired,
  }
export default DropdownMenu;