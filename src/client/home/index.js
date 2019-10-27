import React, { Suspense } from 'react';
import Page from './Page';
import { Loading, ErrorBoundaryWithRetry, Error } from '../components';

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundaryWithRetry fallback={error => <Error error={error} />}>
        <Page />
      </ErrorBoundaryWithRetry>
    </Suspense>
  );
}
