import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './client/theme';
import App from './client/App';
import createEnvironment from './client/createEnvironment';

const AppWithProviders = () => {
  const [environment, updateEnvironment] = useState(createEnvironment());
  return (
    <StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppWithProviders />);
