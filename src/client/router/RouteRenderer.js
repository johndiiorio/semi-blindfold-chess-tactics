import React, { useContext, useEffect, useTransition, Suspense, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import RoutingContext from './RoutingContext';
import ErrorBoundary from '../components/ErrorBoundary';

const SUSPENSE_CONFIG = { timeoutMs: 2000 };

const useStyles = makeStyles(theme => ({
  pending: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
    animation: '0s linear 0.5s forwards $makeVisible',
    visibility: 'hidden',
  },
  '@keyframes makeVisible': {
    to: {
      visibility: 'visible',
    },
  },
}));

const RouterRenderer = () => {
  const router = useContext(RoutingContext);
  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);
  const classes = useStyles();

  const [routeEntry, setRouteEntry] = useState(router.get());

  useEffect(() => {
    const currentEntry = router.get();
    if (currentEntry !== routeEntry) {
      setRouteEntry(currentEntry);
      return;
    }

    const dispose = router.subscribe(nextEntry => {
      startTransition(() => {
        setRouteEntry(nextEntry);
      });
    });
    return () => dispose();
    // eslint-disable-next-line
  }, [router, startTransition]);

  const reversedItems = [].concat(routeEntry.entries).reverse();
  const firstItem = reversedItems[0];

  let routeComponent = (
    <RouteComponent
      component={firstItem.component}
      prepared={firstItem.prepared}
      routeData={firstItem.routeData}
    />
  );
  for (let ii = 1; ii < reversedItems.length; ii++) {
    const nextItem = reversedItems[ii];
    routeComponent = (
      <RouteComponent
        component={nextItem.component}
        prepared={nextItem.prepared}
        routeData={nextItem.routeData}
      >
        {routeComponent}
      </RouteComponent>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={'Loading fallback...'}>
        {isPending ? <div className={classes.pending}>Loading pending...</div> : null}
        {routeComponent}
      </Suspense>
    </ErrorBoundary>
  );
};

const RouteComponent = ({ component, routeData, prepared, children }) => {
  const Component = component.read();
  return (
    <Component routeData={routeData} prepared={prepared}>
      {children}
    </Component>
  );
};

export default RouterRenderer;
