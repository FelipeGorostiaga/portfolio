import React, { useCallback, useRef, useState } from 'react';
import Controls from '~/components/Games/GameOfLife/Controls/Controls';
import HackerText from '@ui/HackerText/HackerText';
import styles from './GameOfLife.module.scss';
import { createGrid, getRoundedProperty, neighbourOperations } from '~/utils/lib/grid';
import Link from 'next/link';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import useBreakpoints from '~/hooks/useBreakpoints';


const rows = 16;
const cols = 16;

interface CellProp {
  alive: boolean;
  position: [number, number];
  onClick: (i: number, j: number) => void;
  className?: string;
}

const GridCell = ({ alive, position, onClick, className = '' }: CellProp) => {
  return (
    <div onClick={() => onClick(...position)}
         className={`w-[18px] h-[18px] xs:w-[24px] xs:h-[24px] sm:w-[35px] sm:h-[35px] border border-neutral-400 dark:border-neutral-800 cursor-pointer 
         ${alive ? 'bg-blue-600 dark:bg-blue-800' : 'bg-neutral-200 hover:bg-neutral-300 dark:bg-spacegray dark:hover:bg-[#0c0c0c]'} transition-colors ${className}`} />
  );
};

const GameOfLife = () => {
  const { sm } = useBreakpoints();
  const [grid, setGrid] = useState(() => createGrid(rows, cols, () => 0));
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  /*
   * rule 1: Each cell with one or no neighbours dies (solitude)
   * rule 2: Each cell with four o more neighbours dies (overpopulation)
   * rule 3: If a cell is dead and has three neighbours, it becomes alive
   * */
  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid(prevGrid => {
      const newGrid = structuredClone(prevGrid);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let aliveNeighbours = 0;
          neighbourOperations.forEach(([x, y]) => {
            const newRow = i + x;
            const newCol = j + y;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              aliveNeighbours += prevGrid[newRow][newCol];
            }
          });
          if (aliveNeighbours < 2 || aliveNeighbours > 3) { // rules 1 & 2
            newGrid[i][j] = 0;
          } else if (prevGrid[i][j] === 0 && aliveNeighbours === 3) { // rule 3
            newGrid[i][j] = 1;
          }
        }
      }
      return newGrid;
    });

    setTimeout(simulate, 750);
  }, []);

  const clearGrid = () => {
    setGrid(createGrid(rows, cols, () => 0));
    setRunning(false);
  };

  const randomizeGrid = () => {
    const randomGrid = createGrid(rows, cols, () => {
      const rand = Math.random();
      return rand < 0.3 ? 1 : 0;
    });
    setGrid(randomGrid);
    setRunning(false);
  };

  const handleCellClick = (i: number, j: number) => {
    const gridCopy = structuredClone(grid);
    const cellValue = grid[i][j];
    gridCopy[i][j] = cellValue ? 0 : 1;
    setGrid(gridCopy);
  };

  return (
    <div className="max-w-6xl w-full flex flex-col items-center gap-3 mx-auto">
      <HackerText className="text-4xl sm:text-6xl dark:text-slate-200 text-slate-800 font-mono-game ">GAME OF
        LIFE</HackerText>
      <div className="flex flex-row items-center w-[288px] xs:w-[384px] sm:w-[560px] justify-center relative h-[15px]">
        <Link className="flex flex-row items-center justify-start cursor-pointer group absolute left-0 -top-1"
              href="/games">
          <ArrowBackIosRoundedIcon className="text-gray-700 group-hover:text-blue-600 transition-colors mt-[1px]" sx={{
            fontSize: sm ? '12px' : '14px',
          }} />
          <span
            className="text-sm sm:text-base group-hover:underline group-hover:text-blue-600 transition-colors">Back</span>
        </Link>
      </div>
      <div className={styles.gridContainer}>
        {
          grid.map((r, i) => r.map((col, j) =>
            <GridCell key={`${i}-${j}`}
                      alive={!!grid[i][j]}
                      position={[i, j]}
                      onClick={handleCellClick}
                      className={getRoundedProperty(i, j, rows, cols)} />,
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
                  onClear={clearGrid}
                  onRandomize={randomizeGrid} />
      </div>
    </div>
  );
};

export default GameOfLife;
