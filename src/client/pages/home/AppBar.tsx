import React from 'react';
import { AppBar as MuiAppBar, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 16,
  },
}));

const AppBar = () => {
  const classes = useStyles();
  return (
    <Paper>
      <MuiAppBar position="static" className={classes.appBar}>
        <Typography className={classes.title} variant="h6">
          Semi-blindfold Chess Tactics
        </Typography>
      </MuiAppBar>
    </Paper>
  );
};

export default AppBar;
