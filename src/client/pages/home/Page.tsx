import React, { Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { PreloadedQuery } from 'react-relay/lib/relay-experimental/EntryPointTypes';
import { AppBar, Toolbar } from '@material-ui/core';
import Puzzles from './Puzzles';
import { Loading, ErrorBoundary, ErrorPage } from '../../components';
import { PageQuery } from './__generated__/PageQuery.graphql';

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
      <ErrorBoundary fallback={(error: Error) => <ErrorPage />}>
        <AppBar position="static">
          <Toolbar>hi</Toolbar>
        </AppBar>
        <Puzzles data={data} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
