import { useEffect, useState } from 'react';

interface Stopwatch {
  milliseconds: number;
  seconds: number;
  minutes: number;
  running: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const useStopwatch = (): Stopwatch => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (running) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [running]);


  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = (time / 10) % 100;

  const stop = () => {
    setRunning(false);
  }

  const start = () => {
    setRunning(true);
  }

  const reset = () => {
    setTime(0);
    setRunning(false);
  };

  return {
    running,
    milliseconds,
    seconds,
    minutes,
    start,
    stop,
    reset,
  }
}

export default useStopwatch;
