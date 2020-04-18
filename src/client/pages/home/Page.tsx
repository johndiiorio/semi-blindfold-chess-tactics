import React, { Suspense } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { PreloadedQuery } from 'react-relay/lib/relay-experimental/EntryPointTypes';
import { makeStyles } from '@material-ui/styles';
import Puzzles from './Puzzles';
import AppBar from './AppBar';
import { Loading, ErrorBoundary, ErrorPage } from '../../components';
import { PageQuery } from './__generated__/PageQuery.graphql';

interface Props {
  prepared: {
    query: PreloadedQuery<PageQuery>;
  };
}

const useStyles = makeStyles(() => ({
  page: {
    padding: 16,
  },
}));

const Page = ({ prepared }: Props) => {
  const classes = useStyles();
  const data = usePreloadedQuery(
    graphql`
      query PageQuery {
        ...Puzzles_puzzle
      }
    `,
    prepared.query
  );

  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={(error: Error) => <ErrorPage />}>
        <AppBar />
        <div className={classes.page}>
          <Puzzles data={data} />
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
