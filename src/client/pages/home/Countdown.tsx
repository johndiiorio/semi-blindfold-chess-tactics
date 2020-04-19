import React, { useState, useCallback } from 'react';
import useInterval from 'react-useinterval';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface Props {
  finish: () => void;
  startNum: number;
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  num: {
    fontSize: '15rem',
  },
}));

const Countdown = ({ finish, startNum }: Props) => {
  const [num, updateNum] = useState(startNum);
  const [delay, updateDelay] = useState<number | null>(1000);
  const classes = useStyles();

  const update = useCallback(() => {
    const nextNum = num - 1;
    if (nextNum === 0) {
      finish();
      updateDelay(null);
    } else {
      updateNum(nextNum);
    }
  }, [finish, num]);

  useInterval(update, delay);

  return (
    <div className={classes.container}>
      <Typography className={classes.num} variant="h1">
        {num}
      </Typography>
      <Typography variant="h5">Get ready...</Typography>
    </div>
  );
};

export default Countdown;
