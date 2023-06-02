import styles from './Minesweeper.module.scss';
import React, { type MouseEvent, useMemo, useState } from 'react';
import { createGrid, getRoundedProperty, neighbourOperations } from '~/utils/lib/grid';
import GridItem from '~/components/Games/Minesweeper/GridItem';
import HackerText from '@ui/HackerText/HackerText';
import Button from '@ui/Button/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import useStopwatch from '~/hooks/useStopwatch';
import Image from 'next/image';
import Link from 'next/link';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import useBreakpoints from '~/hooks/useBreakpoints';

const rows = 16;
const cols = 16;
const bombs = 50;

export interface GridPosition {
  hasBomb: boolean;
  hasFlag: boolean;
  uncovered: boolean;
  bombNeighbours: number;
}

function uncoverNeighbours(grid: GridPosition[][], i: number, j: number, visited: Set<[number, number]>) {
  if (i < 0 || j < 0 || i >= rows || j >= cols || visited.has([i, j]) || grid[i][j].uncovered) {
    return;
  }
  visited.add([i, j]);
  grid[i][j].uncovered = true;
  if (grid[i][j].bombNeighbours === 0) {
    for (let opIdx = 0; opIdx < neighbourOperations.length; opIdx++) {
      const newRow = i + neighbourOperations[opIdx][0];
      const newCol = j + neighbourOperations[opIdx][1];
      uncoverNeighbours(grid, newRow, newCol, visited);
    }
  }
}

function countNeighbourBombs(grid: GridPosition[][], i: number, j: number): number {
  let neighbourBombs = 0;
  neighbourOperations.forEach(([x, y]) => {
    const newRow = i + x;
    const newCol = j + y;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      if (grid[newRow][newCol].hasBomb) {
        neighbourBombs += 1;
      }
    }
  });
  return neighbourBombs;
}

function addBombNeighbourData(grid: GridPosition[][]) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].bombNeighbours = countNeighbourBombs(grid, i, j);
    }
  }
}

function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createMinesweeperGrid() {
  const mappingFn = (): GridPosition => {
    return {
      hasBomb: false,
      hasFlag: false,
      uncovered: false,
      bombNeighbours: 0,
    };
  };
  const grid = createGrid(rows, cols, mappingFn);
  let usedBombs = 0;
  do {
    const randomRow = randomIntFromInterval(0, rows - 1);
    const randomCol = randomIntFromInterval(0, cols - 1);
    if (!grid[randomRow][randomCol].hasBomb) {
      grid[randomRow][randomCol].hasBomb = true;
      usedBombs += 1;
    }
  } while (usedBombs < bombs);
  addBombNeighbourData(grid);
  return grid;
}

function hasWon(grid: GridPosition[][]): boolean {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!grid[i][j].uncovered && !grid[i][j].hasFlag) {
        return false;
      }
    }
  }
  return true;
}

const Minesweeper = () => {
  const [grid, setGrid] = useState<GridPosition[][]>(() => createMinesweeperGrid());
  const [remainingFlags, setRemainingFlags] = useState(bombs);
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);
  const {
    milliseconds,
    seconds,
    minutes,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
    running,
  } = useStopwatch();
  const { xs, sm } = useBreakpoints();

  const finished = useMemo(() => lost || won, [lost, won]);

  const handleClear = () => {
    const newGrid = createMinesweeperGrid();
    setWon(false);
    setLost(false);
    setRemainingFlags(bombs);
    setGrid(newGrid);
    resetTimer();
  };

  const handleFinished = (won: boolean) => {
    if (won) {
      setWon(true);
    } else {
      setLost(true);
    }
    stopTimer();
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>, i: number, j: number) => {
    const position = grid[i][j];
    if (finished || position.uncovered || position.hasFlag) {
      return;
    }

    if (!running) {
      startTimer();
    }

    if (position.hasBomb) {
      handleFinished(false);
      setGrid(prevGrid => {
        const newGrid = structuredClone(prevGrid);
        // uncover all bombs
        for (let k = 0; k < rows; k++) {
          for (let m = 0; m < cols; m++) {
            if (grid[k][m].hasBomb) {
              newGrid[k][m].uncovered = true;
            }
          }
        }
        return newGrid;
      });
      return;
    }

    if (position.bombNeighbours === 0) {
      // iterate recursively through all 0 bomb neighbours and uncover them
      setGrid(prevGrid => {
        const newGrid = structuredClone(prevGrid);
        const visited = new Set<[number, number]>();
        visited.add([i, j]);
        uncoverNeighbours(newGrid, i, j, visited);
        if (hasWon(newGrid)) {
          handleFinished(true);
        }
        return newGrid;
      });
    } else {
      setGrid(prevGrid => {
        const newGrid = structuredClone(prevGrid);
        newGrid[i][j].uncovered = true;
        if (hasWon(newGrid)) {
          handleFinished(true);
        }
        return newGrid;
      });
    }
  };

  const handlePlaceFlag = (e: MouseEvent<HTMLDivElement>, i: number, j: number) => {
    // prevent open browser right-click menu
    e.preventDefault();
    // clicks on uncovered item -> do nothing
    if (finished || grid[i][j].uncovered) {
      return;
    }

    if (!running) {
      startTimer();
    }

    // Clicks on item with a flag -> remove flag
    if (grid[i][j].hasFlag) {
      setRemainingFlags(prev => prev + 1);
      setGrid(prevGrid => {
        const newGrid = structuredClone(prevGrid);
        newGrid[i][j].hasFlag = false;
        return newGrid;
      });
      return;
    }

    if (remainingFlags > 0) {
      setRemainingFlags(prev => prev - 1);
      setGrid(prevGrid => {
        const newGrid = structuredClone(prevGrid);
        newGrid[i][j].hasFlag = true;
        if (hasWon(newGrid)) {
          handleFinished(true);
        }
        return newGrid;
      });
      return;
    }
  };

  return (
    <div className="max-w-6xl w-full flex flex-col items-center gap-4 mx-auto">
      <HackerText
        className="text-4xl sm:text-6xl dark:text-slate-200 text-slate-800 font-mono-game">MINESWEEPER</HackerText>
      <div className="flex flex-row items-center w-[288px] xs:w-[384px] sm:w-[560px] justify-center relative">
        {
          !xs && (
            <Link className="flex flex-row items-center justify-start cursor-pointer group absolute left-0 top-1"
                  href="/games">
              <ArrowBackIosRoundedIcon className="text-gray-700 group-hover:text-blue-600 transition-colors" sx={{
                fontSize: sm ? '12px' : '14px',
              }} />
              <span
                className="text-sm sm:text-base group-hover:underline group-hover:text-blue-600 transition-colors">Back</span>
            </Link>
          )
        }
        <div className="flex flex-row items-center gap-2 mr-3">
          <Image src="/flag.png" width={24} height={24} alt="flag" />
          <span
            className="text-xs sm:text-sm md:text-base text-neutral-800 dark:text-neutral-200 font-mono font-semibold">{remainingFlags}</span>
        </div>
        <Image src="/smile.png" width={24} height={24} alt="smile" onClick={handleClear}
               className="mr-2 cursor-pointer" />
        <div className="flex flex-row items-center gap-2">
          <Image src="/stopwatch.png" width={24} height={24} alt="stopwatch" />
          <div className="text-xs sm:text-sm md:text-base text-neutral-800 dark:text-neutral-200 font-mono">
            <span>{('0' + minutes).slice(-2)}:</span>
            <span>{('0' + seconds).slice(-2)}.</span>
            <span>{('0' + milliseconds).slice(-2)}</span>
          </div>
        </div>
      </div>
      <div className={styles.gridContainer}>
        {
          grid.map((r, i) => r.map((element, j) => {
            return <GridItem key={`${i}-${j}`} position={[i, j]} onClick={handleClick} {...element}
                             onRightClick={handlePlaceFlag} className={getRoundedProperty(i, j, rows, cols)} />;
          }))
        }
        {
          finished && (
            <div className={styles.resultContainer}>
              {
                lost && (
                  <div
                    className="bg-neutral-200 dark:bg-[#0c0c0c] w-[200px] h-[120px] sm:w-[240px] sm:h-[130px] px-6 py-5 flex flex-col justify-between items-center border border-neutral-500 dark:border-neutral-900  rounded-xl gap-1">
                    <h1 className="text-lg sm:text-2xl text-neutral-800 dark:text-neutral-100 font-bold">GAME OVER!</h1>
                    <Button size="content" intent="primary" onClick={handleClear}><span
                      className="flex flex-row gap-1 items-center"><ReplayIcon />Replay</span></Button>
                  </div>
                )
              }
              {
                won && (
                  <div
                    className="bg-neutral-200 dark:bg-[#0c0c0c] w-[240px] h-[150px] px-6 py-5 flex flex-col justify-between items-center border border-neutral-500 dark:border-neutral-900 rounded-xl">
                    <h1 className="text-lg sm:text-2xl text-neutral-800 dark:text-neutral-100 font-bold">VICTORY!</h1>
                    <span
                      className="text-base text-neutral-700 dark:text-neutral-300">Score: {(minutes * 60) + seconds}s</span>
                    <Button size="fullWidth" intent="primary" onClick={handleClear}><span
                      className="flex flex-row gap-1 items-center"><ReplayIcon />Replay</span></Button>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Minesweeper;
