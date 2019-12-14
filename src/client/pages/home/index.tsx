import React, { Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { PreloadedQuery } from 'react-relay/lib/relay-experimental/EntryPointTypes';
import { homeQuery } from '../../../__generated__/relay/homeQuery.graphql';
import Puzzles from './Puzzles';
import { Loading, ErrorBoundary, ErrorMessage } from '../../components';

interface Props {
  prepared: {
    query: PreloadedQuery<homeQuery>;
  };
}

const Home = ({ prepared }: Props) => {
  const data = usePreloadedQuery(
    graphql`
      query homeQuery {
        ...Puzzles_puzzle
      }
    `,
    prepared.query,
  );

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={(error: Error) => <ErrorMessage message="Something went wrong" />}>
        <Puzzles data={data} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default Home;
