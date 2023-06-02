import React, { useEffect, useRef, useState } from 'react';
import HackerText from '@ui/HackerText/HackerText';
import useInterval from '~/hooks/useInterval';
import styles from '../Minesweeper/Minesweeper.module.scss';
import Image from 'next/image';
import { useTheme } from '~/contexts/ThemeContext';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Link from 'next/link';
import useBreakpoints from '~/hooks/useBreakpoints';

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

export const Snake = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const { isDark } = useTheme();
  const { sm } = useBreakpoints();

  useInterval(() => gameLoop(), speed);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (speed === null) {
      startGame();
    }
    const keyCode = e.keyCode;
    if (keyCode >= 37 && keyCode <= 40) {
      e.preventDefault();
    }
    switch (keyCode) {
      case 37: // left
        // only if prev is not right
        if (!(dir[0] === 1 && dir[1] === 0)) {
          setDir(DIRECTIONS[keyCode]);
        }
        break;
      case 38: // up
        // only if prev is not down
        if (!(dir[0] === 0 && dir[1] === 1)) {
          setDir(DIRECTIONS[keyCode]);
        }
        break;
      case 39: // right
        // only if prev is not left
        if (!(dir[0] === -1 && dir[1] === 0)) {
          setDir(DIRECTIONS[keyCode]);
        }
        break;
      case 40: // down
        // only if prev is not up
        if (!(dir[0] === 0 && dir[1] === -1)) {
          setDir(DIRECTIONS[keyCode]);
        }
        break;
    }
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
    const fruit = document.getElementById('fruit') as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = isDark ? '#166534' : '#16a34a';
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver, isDark]);

  // tabIndex is used so that the div is actionable and the onKeyDown event is captured
  return (
    <div className="max-w-6xl w-full flex flex-col items-center mx-auto focus:outline-none gap-3"
         onKeyDown={(e) => moveSnake(e)} tabIndex={-1} ref={divRef}>
      <HackerText className="text-4xl sm:text-6xl dark:text-slate-200 text-slate-800 font-mono-game ">SNAKE</HackerText>
      <div className="flex flex-row items-start w-[288px] sm:w-[504px] justify-center relative">
        <Link className="flex flex-row items-center justify-start cursor-pointer group absolute left-0 top-2"
              href="/games">
          <ArrowBackIosRoundedIcon className="text-gray-700 group-hover:text-blue-600 transition-colors" sx={{
            fontSize: sm ? '12px' : '14px',
          }} />
          <span
            className="text-sm sm:text-base group-hover:underline group-hover:text-blue-600 transition-colors">Back</span>
        </Link>
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
