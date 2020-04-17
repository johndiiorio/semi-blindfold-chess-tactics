import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  child: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ErrorPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.child}>
        <Typography variant="h3">Oops! There was an error.</Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
