import React, { useTransition } from 'react';
import { usePaginationFragment } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { Typography } from '@material-ui/core';
import Puzzle from './Puzzle';

const PuzzlesSection = props => {
  const { data, refetch } = usePaginationFragment(
    graphql`
      fragment PuzzlesSection_puzzle on Query
        @argumentDefinitions(cursor: { type: "String" }, count: { type: "Int", defaultValue: 10 })
        @refetchable(queryName: "PuzzlesSectionPaginationQuery") {
        puzzles(first: $count, after: $cursor) @connection(key: "PuzzlesSection_puzzles") {
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
    props.data,
  );

  const [startTransition] = useTransition({ timeoutMs: 500 });

  const puzzles = data.puzzles.edges.map(edge => edge.node);

  const onClick = () => {
    startTransition(() => {
      // TODO
    });
  };

  return (
    <div>
      <Typography variant="h4">Puzzles</Typography>
      {puzzles.map(puzzle => (
        <Puzzle key={puzzle.id} {...puzzle} />
      ))}
    </div>
  );
};

export default PuzzlesSection;
