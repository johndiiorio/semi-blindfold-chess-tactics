import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  RefForwardingComponent,
} from 'react';
import classNames from 'classnames';
import { Chessground as NativeChessground } from 'chessground';
import { makeStyles } from '@material-ui/styles';
import usePrevious from '../../hooks/usePrevious';
import brown from './assets/brown.svg';
import bB from './assets/bB.svg';
import bK from './assets/bK.svg';
import bN from './assets/bN.svg';
import bP from './assets/bP.svg';
import bQ from './assets/bQ.svg';
import bR from './assets/bR.svg';
import wB from './assets/wB.svg';
import wK from './assets/wK.svg';
import wN from './assets/wN.svg';
import wP from './assets/wP.svg';
import wQ from './assets/wQ.svg';
import wR from './assets/wR.svg';

const useStyles = makeStyles(() => ({
  container: {
    '@global': {
      '.cg-wrap': {
        width: 320,
        height: 320,
        position: 'relative',
        display: 'block',
      },
      'cg-helper': {
        position: 'absolute',
        width: '12.5%',
        paddingBottom: '12.5%',
        display: 'table',
        bottom: 0,
      },
      'cg-container': {
        position: 'absolute',
        width: '800%',
        height: '800%',
        display: 'block',
        bottom: 0,
      },
      'cg-board': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        userSelect: 'none',
        lineHeight: 0,
        backgroundSize: 'cover',
        cursor: 'pointer',
        backgroundImage: `url(${brown})`,
      },
      'cg-board square': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '12.5%',
        height: '12.5%',
        pointerEvents: 'none',
      },
      'cg-board square.move-dest': {
        background:
          'radial-gradient(rgba(20, 85, 30, 0.5) 22%, #208530 0, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0) 0)',
        pointerEvents: 'auto',
      },
      'cg-board square.premove-dest': {
        background:
          'radial-gradient(rgba(20, 30, 85, 0.5) 22%, #203085 0, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0) 0)',
      },
      'cg-board square.oc.move-dest': {
        background:
          'radial-gradient(transparent 0%, transparent 80%, rgba(20, 85, 0, 0.3) 80%)',
      },
      'cg-board square.oc.premove-dest': {
        background:
          'radial-gradient(transparent 0%, transparent 80%, rgba(20, 30, 85, 0.2) 80%)',
      },
      'cg-board square.move-dest:hover': {
        background: 'rgba(20, 85, 30, 0.3)',
      },
      'cg-board square.premove-dest:hover': {
        background: 'rgba(20, 30, 85, 0.2)',
      },
      'cg-board square.last-move': {
        willChange: 'transform',
        backgroundColor: 'rgba(155, 199, 0, 0.41)',
      },
      'cg-board square.selected': {
        backgroundColor: 'rgba(20, 85, 30, 0.5)',
      },
      'cg-board square.check': {
        background:
          'radial-gradient(ellipse at center, rgba(255, 0, 0, 1) 0%, rgba(231, 0, 0, 1) 25%, rgba(169, 0, 0, 0) 89%, rgba(158, 0, 0, 0) 100%)',
      },
      'cg-board square.current-premove': {
        backgroundColor: 'rgba(20, 30, 85, 0.5)',
      },
      '.cg-wrap piece': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '12.5%',
        height: '12.5%',
        backgroundSize: 'cover',
        zIndex: 2,
        willChange: 'transform',
        pointerEvents: 'none',
      },
      'cg-board piece.dragging': {
        cursor: 'move',
        zIndex: 9,
      },
      'cg-board piece.anim': {
        zIndex: 8,
      },
      'cg-board piece.fading': {
        zIndex: 1,
        opacity: 0.5,
      },
      '.cg-wrap square.move-dest:hover': {
        backgroundColor: 'rgba(20, 85, 30, 0.3)',
      },
      '.cg-wrap piece.ghost': {
        opacity: 0.3,
      },
      '.cg-wrap svg': {
        overflow: 'hidden',
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.6,
      },
      '.cg-wrap svg image': {
        opacity: 0.5,
      },
      '.cg-wrap coords': {
        position: 'absolute',
        display: 'flex',
        pointerEvents: 'none',
        opacity: 0.8,
        fontSize: 9,
      },
      '.cg-wrap coords.ranks': {
        right: -15,
        top: 0,
        flexFlow: 'column-reverse',
        height: '100%',
        width: 12,
      },
      '.cg-wrap coords.ranks.black': {
        flexFlow: 'column',
      },
      '.cg-wrap coords.files': {
        bottom: -16,
        left: 0,
        flexFlow: 'row',
        width: '100%',
        height: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
      },
      '.cg-wrap coords.files.black': {
        flexFlow: 'row-reverse',
      },
      '.cg-wrap coords coord': {
        flex: '1 1 auto',
      },
      '.cg-wrap coords.ranks coord': {
        transform: 'translateY(39%)',
      },
      'cg-board piece.pawn.white': {
        backgroundImage: `url(${wP})`,
      },
      'cg-board piece.bishop.white': {
        backgroundImage: `url(${wB})`,
      },
      'cg-board piece.knight.white': {
        backgroundImage: `url(${wN})`,
      },
      'cg-board piece.rook.white': {
        backgroundImage: `url(${wR})`,
      },
      'cg-board piece.queen.white': {
        backgroundImage: `url(${wQ})`,
      },
      'cg-board piece.king.white': {
        backgroundImage: `url(${wK})`,
      },
      'cg-board piece.pawn.black': {
        backgroundImage: `url(${bP})`,
      },
      'cg-board piece.bishop.black': {
        backgroundImage: `url(${bB})`,
      },
      'cg-board piece.knight.black': {
        backgroundImage: `url(${bN})`,
      },
      'cg-board piece.rook.black': {
        backgroundImage: `url(${bR})`,
      },
      'cg-board piece.queen.black': {
        backgroundImage: `url(${bQ})`,
      },
      'cg-board piece.king.black': {
        backgroundImage: `url(${bK})`,
      },
    },
  },
  disabled: {
    opacity: 0.2,
  },
}));

type Turn = 'white' | 'black';

type InvokeFn = (fnName: string, ...args: any[]) => any;

interface Props {
  width: number;
  height: number;
  turnColor: Turn;
  className?: string;
}

interface InputRef {
  invoke: InvokeFn;
}

interface Props {
  [propName: string]: any;
}

const Chessground: RefForwardingComponent<InputRef, Props> = (
  props: Props,
  ref
) => {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const cg = useRef<any>(null);
  const previousProps = usePrevious(props);

  useImperativeHandle(ref, () => ({
    invoke: (fnName, ...args) => {
      if (cg && cg.current) {
        return cg.current![fnName](...args);
      }
    },
  }));

  useEffect(() => {
    if (!containerRef || !containerRef.current) {
      return;
    }
    if (cg.current) {
      cg.current.destroy();
    }
    cg.current = NativeChessground(containerRef.current, props);
    if (props.turnColor === 'black') {
      cg.current.toggleOrientation();
    }
    return () => {
      if (cg.current) {
        cg.current.destroy();
      }
    };
  }, [props, previousProps]);
  return (
    <div
      className={classNames(classes.container, props.className, {
        [classes.disabled]: props.viewOnly,
      })}
    >
      <div
        ref={containerRef}
        style={{ width: props.width, height: props.height }}
      />
    </div>
  );
};

export default forwardRef(Chessground);
