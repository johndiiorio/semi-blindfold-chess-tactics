import React, { useTransition, useState } from 'react';
import { usePaginationFragment } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { Typography } from '@material-ui/core';
import { Puzzles_puzzle$key } from './__generated__/Puzzles_puzzle.graphql';
import Puzzle from './Puzzle';

interface Props {
  data: Puzzles_puzzle$key;
}

const Puzzles = (props: Props) => {
  const [currentPuzzleIndex, updateCurrentPuzzleIndex] = useState(0);
  const { data, refetch } = usePaginationFragment(
    graphql`
      fragment Puzzles_puzzle on Query
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: "Int", defaultValue: 10 }
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

  const [startTransition] = useTransition({ timeoutMs: 500 });

  const puzzles = data!.puzzles!.edges!.map(edge => edge!.node);
  const currentPuzzle = puzzles[currentPuzzleIndex];

  const onClick = () => {
    startTransition(() => {
      // TODO
    });
  };

  return (
    <div>
      <Typography variant="h4" color="textSecondary">
        Puzzles
      </Typography>
      <Puzzle startFen={currentPuzzle!.startFen} moves={currentPuzzle!.moves} />
    </div>
  );
};

export default Puzzles;
