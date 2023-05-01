import {type MouseEvent} from "react";
import {cva} from "class-variance-authority";


interface ItemProps {
    position: [number, number];
    onClick: (e: MouseEvent<HTMLDivElement>, i: number, j: number) => void;
    uncovered: boolean;
    hasBomb: boolean;
    bombNeighbours: number;
}

const itemStyles = cva(
    'bg-slate-200 hover:bg-slate-300 dark:bg-spacegray dark:hover:bg-black border border-neutral-400 dark:border-slate-800 w-[40px] cursor-pointer transition-colors',
    {
        variants: {
            width: {
                small: 'w-[40px] h-[40px]',
                large:  '',
            }
        },
        defaultVariants: {
            width: 'small',
        },
    },
);

const GridItem = ({position, onClick, uncovered, hasBomb, bombNeighbours}: ItemProps) => {
    return (
        <div className={itemStyles()} onClick={(e) => onClick(e, ...position)}></div>
    );
}

export default GridItem;