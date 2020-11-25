import React from 'react';
import Layout from 'src/components/App/Layout';
import Providers from 'src/providers';

type Props = {};

const App: React.FC<Props> = props => {
  return (
    <Providers {...props}>
      <Layout />
    </Providers>
  );
};

export default App;
