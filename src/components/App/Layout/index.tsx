import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import loadable from '@loadable/component';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import ErrorBoundary from '../../ErrorBoundary';
import Error404 from 'src/pages/Error404';

const Home = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/Home'));
const ChunkedPage = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/ChunkedPage'));

const Content = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {};

const Layout: React.FC<Props> = () => {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary>
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chunked-page/" component={ChunkedPage} />
            <Route path="/error-404/" component={Error404} />
          </Switch>
        </Content>
      </ErrorBoundary>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default Layout;
