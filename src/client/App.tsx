import React, { StrictMode } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import RelayEnvironment from './RelayEnvironment';
import { createRouter, RoutingContext, RouteRenderer } from './router';
import routes from './routes';

const router = createRouter(routes);

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#161616',
    width: '100vw',
    height: '100vh',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <StrictMode>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div className={classes.container}>
            <RoutingContext.Provider value={router.context}>
              <RouteRenderer />
            </RoutingContext.Provider>
          </div>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </StrictMode>
  );
}
