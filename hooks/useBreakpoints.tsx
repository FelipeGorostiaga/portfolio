import { useEffect, useState } from 'react';

interface Breakpoints {
  [prop: string]: boolean;
}

interface IBreakpoints {
  [prop: string]: string;
}

const breakpoints: IBreakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

interface WindowSize {
  width: undefined | number;
  height: undefined | number;
}

const useBreakpoints = (): Breakpoints => {
  const [mediaQueries, setMediaQueries] = useState<Breakpoints>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  });

  const [size, setSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const booleanBreakpoints: Breakpoints = Object.keys(breakpoints).reduce((acc, act) => {
      const media = window.matchMedia(`(max-width: ${breakpoints[act]})`).matches;
      return {
        ...acc,
        [act]: media,
      };
    }, {});
    setMediaQueries(booleanBreakpoints);
  }, [size]);

  return mediaQueries;
};

export default useBreakpoints;
