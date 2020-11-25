import React from 'react';
import styled from 'styled-components';

const StyledError404 = styled.div`
  color: red;
`;

type Props = {};

const Error404: React.FC<Props> = () => {
  return <StyledError404>Hello 404</StyledError404>;
};

export default Error404;
