import React, { ReactNode } from 'react';

type Fallback = (error: Error, retry: () => void) => ReactNode;

interface Props {
  fallback: Fallback;
  children: ReactNode;
}

interface State {
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: undefined };

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  _retry = () => {
    this.setState({ error: undefined });
  };

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;
    return error ? fallback(error, this._retry) : children;
  }
}

export default ErrorBoundary;
