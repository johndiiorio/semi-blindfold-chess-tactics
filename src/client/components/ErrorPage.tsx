import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 16,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ErrorPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.text} variant="h1">
        Oops!
      </Typography>
      <Typography className={classes.text} variant="h5">
        There was an unexpected error. Please try again.
      </Typography>
      <div className={classes.buttonContainer}>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
