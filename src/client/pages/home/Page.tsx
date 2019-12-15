import React, { Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { PreloadedQuery } from 'react-relay/lib/relay-experimental/EntryPointTypes';
import { PageQuery } from './__generated__/PageQuery.graphql';
import Puzzles from './Puzzles';
import { Loading, ErrorBoundary, ErrorMessage } from '../../components';

interface Props {
  prepared: {
    query: PreloadedQuery<PageQuery>;
  };
}

const Page = ({ prepared }: Props) => {
  const data = usePreloadedQuery(
    graphql`
      query PageQuery {
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

export default Page;
