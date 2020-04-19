import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Chessground from '../../components/Chessground';
import { getMinVInPx } from '../../utils/dom';
import { SuccessIndicator, FailureIndicator } from '../../components';

const COLORS = {
  white: 'white',
  black: 'black',
};

interface Props {
  startFen: string;
  moves: readonly (readonly (string | null)[])[];
  onSuccess: () => void;
  onFail: () => void;
}

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  chessground: {
    display: 'flex',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const Puzzle = ({ startFen, moves, onSuccess, onFail }: Props) => {
  const classes = useStyles();
  const [moveIndex, updateMoveIndex] = useState(0);
  const [Indicator, updateIndicator] = useState<React.ReactNode | null>(null);
  const startColor =
    startFen.split(' ')[1] === 'w' ? COLORS.white : COLORS.black;
  const [currentFen, updateCurrentFen] = useState(startFen);
  const boardRef = useRef<any>(null);
  const disabled = !!Indicator;

  const handleFinish = useCallback(
    (success: boolean) => {
      const NextIndicator = success ? SuccessIndicator : FailureIndicator;
      updateIndicator(<NextIndicator size={75} />);
      setTimeout(() => {
        if (success) {
          onSuccess();
        } else {
          onFail();
        }
      }, 1500);
    },
    [onFail, onSuccess]
  );

  const onMove = useCallback(
    (origin, destination) => {
      const [correctOrigin, correctDestination] = moves[moveIndex];
      if (origin === correctOrigin && destination === correctDestination) {
        const nextMoveIndex = moveIndex + 1;
        if (nextMoveIndex === moves.length) {
          handleFinish(true);
        } else {
          updateMoveIndex(nextMoveIndex);
        }
      } else {
        handleFinish(false);
      }
      updateCurrentFen(boardRef.current!.invoke('getFen'));
    },
    [handleFinish, moveIndex, moves]
  );

  useEffect(() => {
    if (moveIndex % 2 === 1) {
      const [nextOrigin, nextDestination] = moves[moveIndex];
      boardRef.current!.invoke('move', nextOrigin, nextDestination);
    }
  }, [moveIndex, moves]);

  useEffect(() => {
    updateCurrentFen(startFen);
    updateMoveIndex(0);
    updateIndicator(null);
  }, [startFen]);

  const config = {
    width: getMinVInPx(80),
    height: getMinVInPx(80),
    turnColor: startColor,
    movable: {
      color: startColor,
    },
    fen: currentFen,
    events: {
      move: onMove,
    },
    viewOnly: disabled,
  };

  return (
    <div className={classes.container}>
      <Chessground className={classes.chessground} ref={boardRef} {...config} />
      <div className={classes.indicator}>{Indicator}</div>
    </div>
  );
};

Puzzle.propTypes = {
  startFen: PropTypes.string,
  moves: PropTypes.array,
};

export default Puzzle;
