import React from 'react';
import Chessground from '../../components/Chessground';

const Puzzle = ({ startFen, moves }) => {
  return <Chessground width={400} height={400} fen={startFen} />;
};

export default Puzzle;
