import { type MouseEvent } from 'react';
import Image from 'next/image';
import useBreakpoints from '~/hooks/useBreakpoints';


interface ItemProps {
  position: [number, number];
  onClick: (e: MouseEvent<HTMLDivElement>, i: number, j: number) => void;
  onRightClick: (e: MouseEvent<HTMLDivElement>, i: number, j: number) => void;
  uncovered: boolean;
  hasBomb: boolean;
  hasFlag: boolean;
  bombNeighbours: number;
  className?: string;
}

function getColorByNeighboursAmount(bombNeighbours: number): string {
  switch (bombNeighbours) {
    case 1:
      return 'text-green-500 dark:text-green-200';
    case 2:
      return 'text-green-600 dark:text-green-300';
    case 3:
      return 'text-green-700 dark:text-green-400';
    default:
      return 'text-green-950 dark:text-green-500';
  }
}

const GridItem = ({ position, onClick, onRightClick, uncovered, hasBomb, bombNeighbours, hasFlag, className }: ItemProps) => {
  const { xs, sm, md } = useBreakpoints();
  const baseClasses = `w-[18px] h-[18px] xs:w-[24px] xs:h-[24px] sm:w-[35px] sm:h-[35px] transition-colors border border-green-900 dark:border-slate-800 ${className}`;
  const imgSize = xs? 12: sm? 16 : 24;

  if (!uncovered) {
    if (hasFlag) {
      return <div
        className={`${baseClasses} bg-slate-200 dark:bg-spacegray cursor-pointer flex items-center justify-center`}
        onClick={(e) => onClick(e, ...position)}
        onContextMenu={(e) => onRightClick(e, ...position)}
      >
        <Image src="/flag.png" width={imgSize} height={imgSize} alt="flag" />
      </div>;
    }
    return <div onClick={(e) => onClick(e, ...position)}
                onContextMenu={(e) => onRightClick(e, ...position)}
                className={`${baseClasses} bg-slate-200 hover:bg-slate-300 dark:bg-spacegray dark:hover:bg-[#0c0c0c] cursor-pointer`}></div>;
  }

  // Now everything is uncovered: bomb -> lost, empty -> show empty -> hasNeighbours -> show number

  if (hasBomb) {
    return <div
      className={`${baseClasses} bg-slate-300 dark:bg-black flex items-center justify-center`}
      onClick={(e) => onClick(e, ...position)}
      onContextMenu={(e) => onRightClick(e, ...position)}
    >
      <Image src="/explosion.png" width={imgSize} height={imgSize} alt="flag" />
    </div>;
  }

  if (bombNeighbours === 0) {
    return <div className={`${baseClasses} bg-slate-300 dark:bg-black`}
                onClick={(e) => onClick(e, ...position)}
                onContextMenu={(e) => onRightClick(e, ...position)}></div>;
  }

  return (
    <div
      className={`${baseClasses} bg-slate-300 dark:bg-black text-base sm:text-lg md:text-2xl ${getColorByNeighboursAmount(bombNeighbours)} flex items-center justify-center`}
      onClick={(e) => onClick(e, ...position)}
      onContextMenu={(e) => onRightClick(e, ...position)}>{bombNeighbours}</div>
  );
};

export default GridItem;
