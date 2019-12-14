import React from 'react';

interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return <div>{message}</div>;
};

export default ErrorMessage;
