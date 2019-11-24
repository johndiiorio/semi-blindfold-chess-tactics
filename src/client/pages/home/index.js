import React, { Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import Puzzles from './Puzzles';
import { Loading, ErrorBoundary, Error } from '../../components';

const Home = ({ prepared }) => {
  const data = usePreloadedQuery(
    graphql`
      query homeQuery {
        ...PuzzlesSection_puzzle
      }
    `,
    prepared.query,
  );

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={error => <Error error={error} />}>
        <Puzzles data={data} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default Home;
