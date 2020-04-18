import React, {
  useContext,
  useState,
  useEffect,
  Suspense,
  useTransition,
} from 'react';
import RoutingContext, { Entry } from './RoutingContext';
import { ErrorPage, ErrorBoundary, Loading } from '../components';

const SUSPENSE_CONFIG = { timeoutMs: 2000 };

const RouterRenderer = () => {
  // Access the router
  const router = useContext(RoutingContext);
  if (router == null) {
    throw new Error('RoutingContext not set');
  }

  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);

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
  }, [routeEntry, router, startTransition]);

  const reversedItems = [...routeEntry.entries].reverse();
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
    <ErrorBoundary fallback={(error: Error) => <ErrorPage />}>
      <Suspense fallback={<Loading />}>
        {isPending && <Loading />}
        {routeComponent}
      </Suspense>
    </ErrorBoundary>
  );
};

const RouteComponent: React.FC<Entry> = props => {
  const Component = props.component!.read()!;
  const { routeData, prepared } = props;
  return (
    <Component routeData={routeData} prepared={prepared}>
      {props.children}
    </Component>
  );
};

export default RouterRenderer;
