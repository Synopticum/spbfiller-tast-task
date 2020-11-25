import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const StyledHeader = styled.header`
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AboutLink = styled(NavLink)`
  margin: 0 15px 0 0;
  text-decoration: underline;

  &.active {
    cursor: default;
    pointer-events: none;
    text-decoration: none;
  }
`;

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <StyledHeader>
      <Logo />
      <AboutLink exact={true} to={'/chunked-page/'}>
        About
      </AboutLink>
    </StyledHeader>
  );
};

export default Header;
