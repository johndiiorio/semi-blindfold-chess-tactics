import React, { StrictMode } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import RelayEnvironment from './RelayEnvironment';
import { createRouter, RoutingContext, RouteRenderer } from './router';
import routes from './routes';

const router = createRouter(routes);

export default function App() {
  return (
    <StrictMode>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RoutingContext.Provider value={router.context}>
            <RouteRenderer />
          </RoutingContext.Provider>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </StrictMode>
  );
}
