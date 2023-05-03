import styles from './Minesweeper.module.scss';
import {type MouseEvent, useState} from "react";
import {createGrid} from "~/utils/lib/grid";
import GridItem from "~/components/Games/Minesweeper/GridItem";
import HackerText from "@ui/HackerText/HackerText";


const rows = 16;
const cols = 16;

export interface GridPosition {
    hasBomb: boolean;
    uncovered: boolean
    bombNeighbours: number;
}

function createEmptyMinesweeperGrid() {
    const mappingFn = (): GridPosition => {
        return {
            hasBomb: false,
            uncovered: false,
            bombNeighbours: 0,

        }
    }
    const grid = createGrid(rows, cols, mappingFn);
    // TODO: place bombs
    return grid;
}

function hasWon(): boolean {
    return false;
}

const Minesweeper = () => {
    const [grid, setGrid] = useState<GridPosition[][]>(() => createEmptyMinesweeperGrid());

    const handleClear = () => {
        // todo: clear all
    }

    const handleClick = (e: MouseEvent<HTMLDivElement>, i: number, j: number) => {
        // todo: click on grid item
    }

    return (
        <div className="max-w-6xl w-full flex flex-col items-center gap-4 mx-auto">
            <HackerText className="text-4xl sm:text-6xl dark:text-slate-200 text-slate-800 font-mono-game">MINESWEEPER</HackerText>
            <div className={styles.gridContainer}>
                {
                    grid.map((rows, i) => rows.map((element, j) => {
                        return <GridItem key={`${i}-${j}`} position={[i, j]} onClick={handleClick} {...element} />
                    }))
                }
            </div>
        </div>

    );
}

export default Minesweeper;
