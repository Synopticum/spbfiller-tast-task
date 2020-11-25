import React from 'react';
import { Router } from 'react-router';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from 'src/components/ErrorBoundary/';
import { createBrowserHistory } from 'history';
import GlobalStyle from 'src/components/GlobalStyle';
import tokens from 'src/tokens';
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
          <ThemeProvider theme={tokens}>
            <StoreProvider store={store}>{children}</StoreProvider>
          </ThemeProvider>
        </Router>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default Providers;
