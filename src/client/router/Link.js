import RoutingContext from './RoutingContext';
import React from 'react';

const { useCallback, useContext } = React;

const Link = ({ to, children }) => {
  const router = useContext(RoutingContext);

  const changeRoute = useCallback(
    event => {
      event.preventDefault();
      router.history.push(to);
    },
    [to, router],
  );

  const preloadRouteCode = useCallback(() => {
    router.preloadCode(to);
  }, [to, router]);

  const preloadRoute = useCallback(() => {
    router.preload(to);
  }, [to, router]);

  return (
    <a href={to} onClick={changeRoute} onMouseEnter={preloadRouteCode} onMouseDown={preloadRoute}>
      {children}
    </a>
  );
};

export default Link;
