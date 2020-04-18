import React, { useTransition, useState, useCallback } from 'react';
import { usePaginationFragment } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Puzzles_puzzle$key } from './__generated__/Puzzles_puzzle.graphql';
import Puzzle from './Puzzle';
import { Loading } from '../../components';

interface Props {
  data: Puzzles_puzzle$key;
}

const useStyles = makeStyles(theme => ({
  loading: {
    height: '50vh',
  },
}));

const Puzzles = (props: Props) => {
  const [currentPuzzleIndex, updateCurrentPuzzleIndex] = useState(0);
  const classes = useStyles();
  const { data, loadNext, hasNext: morePuzzlesExist } = usePaginationFragment(
    graphql`
      fragment Puzzles_puzzle on Query
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: "Int", defaultValue: 1 }
        )
        @refetchable(queryName: "PuzzlesPaginationQuery") {
        puzzles(first: $count, after: $cursor)
          @connection(key: "Puzzles_puzzles") {
          edges {
            node {
              id
              startFen
              moves
            }
          }
        }
      }
    `,
    props.data
  );

  const [startTransition, isPending] = useTransition({ timeoutMs: 500 });

  const puzzles = data!.puzzles!.edges!.map(edge => edge!.node);
  const currentPuzzle = puzzles[currentPuzzleIndex];

  const onPuzzleFinish = useCallback(() => {
    if (morePuzzlesExist) {
      updateCurrentPuzzleIndex(currentPuzzleIndex + 1);
      startTransition(() => {
        loadNext(1);
      });
    } else {
      // TODO redirect to finish
    }
  }, [currentPuzzleIndex, loadNext, morePuzzlesExist, startTransition]);

  const onSuccess = useCallback(() => {
    // TODO show success
    onPuzzleFinish();
  }, [onPuzzleFinish]);

  const onFail = useCallback(() => {
    // TODO show fail
    onPuzzleFinish();
  }, [onPuzzleFinish]);

  return (
    <div>
      <Typography variant="h5">Puzzles</Typography>
      {currentPuzzle && (
        <Puzzle
          startFen={currentPuzzle.startFen}
          moves={currentPuzzle.moves}
          onSuccess={onSuccess}
          onFail={onFail}
        />
      )}
      <div className={classes.loading}>{isPending && <Loading />}</div>
    </div>
  );
};

export default Puzzles;
