import React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    animation: '0s linear 0.5s forwards $makeVisible',
    visibility: 'hidden',
  },
  '@keyframes makeVisible': {
    to: {
      visibility: 'visible',
    },
  },
}));

const Loading = (props: CircularProgressProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress {...props} />
    </div>
  );
};

export default Loading;
