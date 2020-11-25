import React from 'react';
import { Router } from 'react-router';
import ErrorBoundary from 'src/components/ErrorBoundary/';
import { createBrowserHistory } from 'history';
import GlobalStyle from 'src/components/GlobalStyle';
import { Provider as StoreProvider } from 'react-redux';
import store from './store';

const history = createBrowserHistory();

export type Props = {};

const Providers: React.FC<Props> = ({ children }) => {
  const routerProps = { history };
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Router {...routerProps}>
          <GlobalStyle />
          <StoreProvider store={store}>{children}</StoreProvider>
        </Router>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default Providers;
