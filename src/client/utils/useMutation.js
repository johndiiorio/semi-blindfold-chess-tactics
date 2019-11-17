import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useRelayEnvironment } from 'react-relay/hooks';
import { commitMutation } from 'relay-runtime';

const useMutation = mutation => {
  const environment = useRelayEnvironment();
  const [isPending, setPending] = useState(false);
  const requestRef = useRef(null);
  const mountedRef = useRef(false);
  const execute = useCallback(
    (config = { variables: {} }) => {
      if (requestRef.current != null) {
        return;
      }
      const request = commitMutation(environment, {
        ...config,
        onCompleted: () => {
          if (!mountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          config.onCompleted && config.onCompleted();
        },
        onError: error => {
          if (!mountedRef.current) {
            return;
          }
          requestRef.current = null;
          setPending(false);
          config.onError && config.onError(error);
        },
        mutation,
      });
      requestRef.current = request;
      setPending(true);
    },
    [mutation, environment],
  );
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);
  return [isPending, execute];
};

export default useMutation;
