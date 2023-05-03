import styles from './Minesweeper.module.scss';
import { type MouseEvent, useState } from 'react';
import { createGrid, neighbourOperations } from '~/utils/lib/grid';
import GridItem from '~/components/Games/Minesweeper/GridItem';
import HackerText from '@ui/HackerText/HackerText';


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
  if (i < 0 || j < 0 || i > rows || j > cols || visited.has([i, j]) || grid[i][j].uncovered) {
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
  while (usedBombs < bombs) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!grid[i][j].hasBomb) {
          const rand = Math.random();
          if (rand < 0.25) {
            grid[i][j].hasBomb = true;
            usedBombs++;
          }
        }
      }
    }
  }
  addBombNeighbourData(grid);
  return grid;
}

function hasWon(grid: GridPosition[][]): boolean {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!grid[i][j].uncovered || !grid[i][j].hasFlag) {
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

  const finished = lost || won;

  const handleClear = () => {
    const newGrid = createMinesweeperGrid();
    setGrid(newGrid);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>, i: number, j: number) => {
    const position = grid[i][j];
    if (position.uncovered || position.hasFlag) {
      return;
    }

    if (position.hasBomb) {
      setLost(true);
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
        return newGrid;
      });
    } else {
      setGrid(prevGrid => {
        const newGrid = structuredClone(prevGrid);
        newGrid[i][j].uncovered = true;
        return newGrid;
      });
    }
  };

  const handlePlaceFlag = (e: MouseEvent<HTMLDivElement>, i: number, j: number) => {
    // prevent open browser right-click menu
    e.preventDefault();
    // clicks on uncovered item -> do nothing
    if (grid[i][j].uncovered) {
      return;
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
        return newGrid;
      });
      return;
    }
  };

  return (
    <div className="max-w-6xl w-full flex flex-col items-center gap-4 mx-auto">
      <HackerText
        className="text-4xl sm:text-6xl dark:text-slate-200 text-slate-800 font-mono-game">MINESWEEPER</HackerText>
      <div className={styles.gridContainer}>
        {
          grid.map((rows, i) => rows.map((element, j) => {
            return <GridItem key={`${i}-${j}`} position={[i, j]} onClick={handleClick} {...element}
                             onRightClick={handlePlaceFlag} />;
          }))
        }
      </div>
      {/* TODO: add controls: clear, remaining flags, highscore, elapsed time, etc... */}
    </div>
  );
};

export default Minesweeper;
