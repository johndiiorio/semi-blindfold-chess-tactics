import React, { Suspense, useState } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import UserSection from './UserSection';
import { Loading, ErrorBoundaryWithRetry, Error } from '../../components';

const Home = props => {
  const data = usePreloadedQuery(
    graphql`
      query homeQuery($id: String) {
        user(id: $id) {
          ...UserSection_user
        }
      }
    `,
    props.prepared.homeQuery,
  );

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundaryWithRetry fallback={error => <Error error={error} />}>
        <UserSection user={data.user} />
      </ErrorBoundaryWithRetry>
    </Suspense>
  );
}

export default Home;
