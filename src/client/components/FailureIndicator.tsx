import React from 'react';
import { makeStyles } from '@material-ui/styles';

interface Props {
  size: number;
}

const useStyles = makeStyles(theme => ({
  circle: {
    strokeDasharray: 166,
    strokeDashoffset: 166,
    strokeWidth: 2,
    strokeMiterlimit: 10,
    stroke: '#f44336',
    fill: 'none',
    animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
  },
  failure: {
    borderRadius: '50%',
    display: 'block',
    strokeWidth: 2,
    stroke: '#fff',
    strokeMiterlimit: 10,
    boxShadow: 'inset 0px 0px 0px #f44336',
    animation:
      '$fill .4s ease-in-out .4s forwards, $scale .3s ease-in-out .9s both',
  },
  close: {
    transformOrigin: '50% 50%',
    strokeDasharray: 29,
    strokeDashoffset: 29,
    animation: '$stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
  },
  '@keyframes stroke': {
    '100%': {
      strokeDashoffset: 0,
    },
  },
  '@keyframes scale': {
    '0%, 100%': {
      transform: 'none',
    },
    '50%': {
      transform: 'scale3d(1.1, 1.1, 1)',
    },
  },
  '@keyframes fill': {
    '100%': {
      boxShadow: `inset 0px 0px 0px 1000px #f44336`,
    },
  },
}));

const FailureIndicator = ({ size }: Props) => {
  const classes = useStyles();
  return (
    <svg
      className={classes.failure}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      style={{
        width: size,
        height: size,
      }}
    >
      <circle className={classes.circle} cx="26" cy="26" r="25" fill="none" />
      <path
        className={classes.close}
        fill="none"
        d="M16 16 36 36 M36 16 16 36"
      />
    </svg>
  );
};

export default FailureIndicator;
