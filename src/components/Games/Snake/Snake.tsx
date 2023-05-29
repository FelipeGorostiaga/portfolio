import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createGrid, getRoundedProperty } from '~/utils/lib/grid';
import HackerText from '@ui/HackerText/HackerText';
import styles from '@components/Games/GameOfLife/GameOfLife.module.scss';
import Controls from '@components/Games/GameOfLife/Controls/Controls';

const rows = 16;
const cols = 16;

interface CellProp {
  hasSnake: boolean;
  hasApple: boolean;
  className?: string;
}

const directionsVector: { up: Direction, down: Direction, left: Direction, right: Direction } = {
  up: [-1, 0],
  down: [1, 0],
  right: [0, 1],
  left: [0, -1],
};

const GridCell = ({ hasSnake, className = '' }: CellProp) => {
  return (
    <div className={`w-[18px] h-[18px] xs:w-[24px] xs:h-[24px] sm:w-[35px] sm:h-[35px] border border-neutral-400 dark:border-neutral-800  
         ${hasSnake ? 'bg-green-600 dark:bg-green-800' : 'bg-neutral-200 dark:bg-spacegray '} transition-colors ${className}`} />
  );
};

type Direction = [(0 | 1 | -1), (0 | 1 | -1)];
type Position = [number, number];

function generateFoodPosition(): [number, number] {
  return [12, 14];
}

function generateStartingPosition(): [number, number][] {
  return [[8, 8]];
}

export const Snake = () => {
  const [grid, setGrid] = useState(() => createGrid(rows, cols, () => {
  }));
  const [foodPosition, setFoodPosition] = useState<Position>(() => generateFoodPosition());
  const [running, setRunning] = useState(false);
  // const [direction, setDirection] = useState<Direction>([1, 0]);
  const [snake, setSnake] = useState<Position[]>(() => generateStartingPosition());
  const runningRef = useRef(running);
  const directionRef = useRef([1, 0]);
  runningRef.current = running;


  const simulate = () => {
    if (!runningRef.current) {
      return;
    }
    setSnake(snake => {
      const direction = directionRef.current;
      const currentPosition = snake[snake.length - 1];
      console.log(`Previous position [${currentPosition[0]}, ${currentPosition[1]}]`);
      console.log(`Using direction: ${direction[0]}, ${direction[1]}`);
      const newPos: [number, number] = [currentPosition[0] + direction[0], currentPosition[1] + direction[1]];
      console.log(`New position [${newPos[0]}, ${newPos[1]}]`);
      return [newPos];
    });

    setTimeout(simulate, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp') {
      directionRef.current = directionsVector.up;
    } else if (e.key === 'ArrowDown') {
      directionRef.current = directionsVector.down;
    } else if (e.key === 'ArrowRight') {
      directionRef.current = directionsVector.right;
    } else if (e.key === 'ArrowLeft') {
      directionRef.current = directionsVector.left;
    }
  };

  const positionHasSnake = useCallback(([x, y]: Position): boolean => {
    for (let i = 0; i < snake?.length!; i++) {
      const currentSnakePosition = snake[i];
      if (currentSnakePosition[0] === x && currentSnakePosition[1] === y) {
        return true;
      }
    }
    return false;
  }, [snake]);

  // tabIndex is used so that the div is actionable and the onKeyDown event is captured
  return (
    <div className="max-w-6xl w-full flex flex-col items-center gap-4 mx-auto focus:outline-none"
         onKeyDown={handleKeyPress} tabIndex={-1}>
      <HackerText className="text-4xl sm:text-6xl dark:text-slate-200 text-slate-800 font-mono-game ">SNAKE</HackerText>
      <div className={styles.gridContainer}>
        {
          grid.map((r, i) => r.map((col, j) => {
              const hasApple = foodPosition[0] === i && foodPosition[1] === j;
              const hasSnake = positionHasSnake([i, j]);
              return (
                <GridCell key={`${i}-${j}`}
                          hasSnake={hasSnake}
                          hasApple={hasApple}
                          className={getRoundedProperty(i, j, rows, cols)} />
              );
            },
          ))
        }
      </div>
      <div className="w-[288px] sm:w-[560px]">
        <Controls running={running}
                  onPlay={() => {
                    setRunning(prev => !prev);
                    runningRef.current = true;
                    simulate();
                  }}
                  onClear={() => {
                  }}
                  onRandomize={() => {
                  }} />
      </div>
    </div>
  );
};

export default Snake;
