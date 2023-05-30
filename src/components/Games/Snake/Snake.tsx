import React, { useCallback, useRef, useState, useEffect } from 'react';
import HackerText from '@ui/HackerText/HackerText';
import useInterval from '~/hooks/useInterval';
import styles from '../Minesweeper/Minesweeper.module.scss';
import Image from 'next/image';
import { useTheme } from '~/contexts/ThemeContext';
import Button from '@ui/Button/Button';
import ReplayIcon from '@mui/icons-material/Replay';

const rows = 16;
const cols = 16;

const CANVAS_SIZE = [500, 500];
const SNAKE_START = [
  [8, 7],
  [8, 8],
];
const APPLE_START = [8, 3];
const SCALE = 25;
const SPEED = 100;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};

interface CellProp {
  hasSnake: boolean;
  hasApple: boolean;
  className?: string;
}

const GridCell = ({ hasSnake, hasApple, className = '' }: CellProp) => {
  return (
    <div className={`w-[18px] h-[18px] xs:w-[24px] xs:h-[24px] sm:w-[35px] sm:h-[35px] border border-neutral-400 dark:border-neutral-800  
         ${hasSnake ? 'bg-green-600 dark:bg-green-800' : hasApple ? 'bg-red-600' : 'bg-neutral-200 dark:bg-spacegray'} transition-colors ${className}`} />
  );
};

export const Snake = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const { isDark } = useTheme();

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (speed === null) {
      startGame();
    }
    const keyCode = e.keyCode;
    // @ts-ignore
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };

  const createApple = () => apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece: number[], snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake: number[][]) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setScore(prev => prev + 1);
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    let fruit = document.getElementById('fruit') as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        const colorFill = isDark ? '#166534' : '#16a34a';
        context.fillStyle = colorFill;
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }

  }, [snake, apple, gameOver, isDark]);

  // tabIndex is used so that the div is actionable and the onKeyDown event is captured
  return (
    <div className="max-w-6xl w-full flex flex-col items-center mx-auto focus:outline-none gap-3"
         onKeyDown={(e) => moveSnake(e)} tabIndex={-1}>
      <HackerText className="text-4xl sm:text-6xl dark:text-slate-200 text-slate-800 font-mono-game ">SNAKE</HackerText>
      <div className="flex flex-row items-center w-[288px] sm:w-[560px] justify-center">
        <div className="flex flex-row items-center gap-2 mr-3">
          <Image id="fruit" src="/apple.svg" width={30} height={30} alt="fruit" />
          <span
            className="text-xs sm:text-sm md:text-xl text-neutral-800 dark:text-neutral-200 font-mono font-semibold pt-0.5">{score}</span>
        </div>
      </div>
      <div className="relative">
        <canvas
          className="border-2 border-neutral-400 dark:border-neutral-800 rounded-lg bg-neutral-300 dark:bg-spacegray"
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        {
          gameOver && (
            <div className={styles.resultContainer}>
              <div
                className="bg-neutral-200 dark:bg-[#0c0c0c] px-6 py-5 flex flex-col justify-between items-center border border-neutral-500 dark:border-neutral-900 rounded-xl">
                <span className="font-semibold text-neutral-700 dark:text-neutral-200 text-xl">Your score: {score}</span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Snake;
