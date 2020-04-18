import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    type: 'dark',
    background: {
      paper: '#424242',
      default: '#121212',
    },
  },
  props: {
    MuiTypography: {
      color: 'textSecondary',
    },
  },
});
