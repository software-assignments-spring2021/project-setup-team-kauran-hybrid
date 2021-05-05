import styled from 'styled-components';

export const StyledDropdownMenu = styled.nav`
  display: flex;
//   grid-template-columns: repeat(3, 20px [col-start]);
//   grid-template-rows: repeat(3, 2px [row-start]);
  flex-direction: column;
  justify-content: flex-start;
  
  align-items: center;
//   background: '#EFFFFA';
//   background-color: gray;
//   height: 100vw;
  text-align: left;
  padding: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  
  @media (max-width: '576px') {
    width: 100%;
  }

  dropdown {
    color:black;
    font-size: 1.5rem;
    text-transform: uppercase;
    padding: 0.5rem 0.5rem;
    font-weight: bold;
    letter-spacing: 0.05rem;
    color: '#0D0C1D';
    text-decoration: none;
    transition: color 0.3s linear;
    height:3vw;
    @media (max-width: '576px') {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: '#343078';
    }
  }
`;