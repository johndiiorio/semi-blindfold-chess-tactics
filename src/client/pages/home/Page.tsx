import React, { Suspense, useState } from 'react';
import { usePreloadedQuery } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { PreloadedQuery } from 'react-relay/lib/relay-experimental/EntryPointTypes';
import { makeStyles } from '@material-ui/styles';
import Puzzles from './Puzzles';
import AppBar from './AppBar';
import { Loading, ErrorBoundary, ErrorPage } from '../../components';
import { PageQuery } from './__generated__/PageQuery.graphql';
import Countdown from './Countdown';

interface Props {
  prepared: {
    query: PreloadedQuery<PageQuery>;
  };
}

const useStyles = makeStyles(() => ({
  page: {
    padding: 16,
    height: '100%',
  },
}));

const Page = ({ prepared }: Props) => {
  const classes = useStyles();
  const [finishedCountdown, updateFinishedCountdown] = useState(false);
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
          {finishedCountdown ? (
            <Puzzles data={data} />
          ) : (
            <Countdown
              finish={() => updateFinishedCountdown(true)}
              startNum={3}
            />
          )}
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
