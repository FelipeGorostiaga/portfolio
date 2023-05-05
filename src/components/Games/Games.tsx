import Link from 'next/link';
import Image from 'next/image';
import Card from '@ui/Card/Card';
import useBreakpoints from '~/hooks/useBreakpoints';


const Games = () => {
  const { sm } = useBreakpoints();
  const imgSize = sm? 96 : 128;
  return (
    <div className="flex flex-col max-w-5xl gap-8 px-4">
      <Card>
        <Link href="/games/game-of-life"
              className="flex flex-col sm:flex-row gap-6 p-8 bg-gray-100 dark:bg-darkgray rounded-xl dark:hover:bg-neutral-800 hover:scale-[1.005] hover:bg-gray-200">
          <Image src="/game-of-life.png" alt="game of life" height={imgSize} width={imgSize}
                 className={`object-cover w-[${imgSize}px] h-[${imgSize}px] aspect-square self-center sm:self-auto`} />
          <div className="flex flex-col gap-5 px-2">
            <h1 className="text-neutral-800 dark:text-neutral-200 text-2xl sm:text-4xl font-bold mt-2">Game of Life</h1>
            <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-300">A cellular automaton devised by the British
              mathematician John Horton Conway in
              1970. It is Turing complete
              and can simulate a universal constructor or any other Turing machine.
              One interacts with the Game of Life by creating an initial configuration and observing how it evolves.
            </p>
            <div className="flex flex-col gap-0.5 text-xs sm:text-base text-neutral-800 dark:text-neutral-300">
              <span className="font-semibold text-base sm:text-lg underline mb-1">Rules:</span>
              <span>&#x2022; Any live cell with fewer than two live neighbours dies, as if by underpopulation.</span>
              <span>&#x2022; Any live cell with two or three live neighbours lives on to the next generation.</span>
              <span>&#x2022; Any live cell with more than three live neighbours dies, as if by overpopulation.</span>
              <span>&#x2022; Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</span>
            </div>
          </div>
        </Link>
      </Card>
      <Card>
        <Link href="/games/minesweeper"
              className="flex flex-col sm:flex-row gap-6 p-8 bg-gray-100 dark:bg-darkgray rounded-xl dark:hover:bg-neutral-800 hover:scale-[1.005] hover:bg-gray-200">
          <Image src="/explosion.svg" alt="game of life" height={imgSize} width={imgSize}
                 className={`object-cover w-[${imgSize}px] h-[${imgSize}px] aspect-square self-center sm:self-auto`} />
          <div className="flex flex-col gap-5 px-2">
            <h1 className="text-neutral-800 dark:text-neutral-200 text-2xl sm:text-4xl font-bold mt-2">Minesweeper</h1>
            <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-300">A logic puzzle video game. The game features a grid of clickable squares, with hidden mines scattered
              throughout the board. The objective is to clear the board without detonating any mines, with help from
              clues about the number of neighboring mines in each field.</p>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default Games;
