import Link from 'next/link';
import Image from 'next/image';
import Card from '@ui/Card/Card';


const Games = () => {
  return (
    <div className="flex flex-col max-w-6xl">
      <Link href="/games/game-of-life"
            className="bg-neutral-200 rounded-xl hover:scale-[1.005] hover:bg-neutral-300">
        <Card className="flex flex-row gap-6 p-8 ">
          <>
            <Image src="/game-of-life.png" alt="game of life" height={120} width={120}
                   className="object-cover w-[120px] h-[120px] aspect-square" />
            <div className="flex flex-col gap-5">
              <h1 className="text-neutral-800 text-4xl font-bold mt-2">Game of Life</h1>
              <p className="text-base">A cellular automaton devised by the British mathematician John Horton Conway in
                1970. It is Turing complete
                and can simulate a universal constructor or any other Turing machine.
                One interacts with the Game of Life by creating an initial configuration and observing how it evolves.
              </p>
              <div className="flex flex-col gap-0.5 text-md">
                <span><span className="font-semibold">Rule 1:</span> Any live cell with fewer than two live neighbours dies, as if by underpopulation.</span>
                <span><span className="font-semibold">Rule 2:</span>  Any live cell with two or three live neighbours lives on to the next generation.</span>
                <span><span className="font-semibold">Rule 3:</span>  Any live cell with more than three live neighbours dies, as if by overpopulation.</span>
                <span><span className="font-semibold">Rule 4:</span>  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</span>
              </div>
            </div>
          </>
        </Card>
      </Link>
    </div>
  );
};

export default Games;
