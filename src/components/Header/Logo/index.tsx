import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledLogo = styled.header`
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled(NavLink)`
  &.active {
    cursor: default;
    pointer-events: none;
  }
`;

type Props = {};

const Logo: React.FC<Props> = () => {
  const title = 'Go back to homepage';

  return (
    <StyledLogo>
      <Link exact={true} to={'/'} title={title}>
        <img src="/web/images/logo.png" width="200" height="45" alt={title} />
      </Link>
    </StyledLogo>
  );
};

export default Logo;
