import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Chessground from '../../components/Chessground';

const COLORS = {
  white: 'white',
  black: 'black',
};

interface Props {
  startFen: string;
  moves: readonly (readonly (string | null)[])[];
}

const useStyles = makeStyles(theme => ({
  chessground: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Puzzle = ({ startFen, moves }: Props) => {
  const classes = useStyles();
  const [moveIndex, updateMoveIndex] = useState(0);
  const startColor = startFen.split(' ')[1] === 'w' ? COLORS.white : COLORS.black;
  const [currentFen, updateCurrentFen] = useState(startFen);
  const boardRef = useRef<any>(null);

  const getBoardFen = () => {
    return boardRef.current!.invoke('getFen');
  };

  useEffect(() => {
    if (moveIndex % 2 === 1) {
      const [nextOrigin, nextDestination] = moves[moveIndex];
      boardRef.current!.invoke('move', nextOrigin, nextDestination);
    }
  }, [moveIndex, moves]);

  const onMove = useCallback(
    (origin, destination) => {
      const [correctOrigin, correctDestination] = moves[moveIndex];
      if (origin === correctOrigin && destination === correctDestination) {
        const nextMoveIndex = moveIndex + 1;
        if (nextMoveIndex === moves.length) {
          console.log('Win');
        } else {
          updateMoveIndex(nextMoveIndex);
          updateCurrentFen(getBoardFen());
        }
      } else {
        console.log('Fail');
      }
    },
    [moveIndex, moves],
  );

  const config = {
    width: 500,
    height: 500,
    turnColor: startColor,
    movable: {
      color: startColor,
    },
    fen: currentFen,
    events: {
      move: onMove,
    },
  };

  return <Chessground className={classes.chessground} ref={boardRef} {...config} />;
};

Puzzle.propTypes = {
  startFen: PropTypes.string,
  moves: PropTypes.array,
};

export default Puzzle;
