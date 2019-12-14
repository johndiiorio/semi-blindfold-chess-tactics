import React from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

const Loading = (props: CircularProgressProps) => {
  return <CircularProgress {...props} />;
};

export default Loading;
