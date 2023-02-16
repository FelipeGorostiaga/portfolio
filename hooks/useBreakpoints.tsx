import { useMediaQuery } from 'react-responsive';

type Media = 'min' | 'max';

interface Breakpoints {
  [prop: string]: boolean;
}

const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

const mediaQuery = useMediaQuery;

const useBreakpoints = (media: Media = 'max'): Breakpoints => {
  if (typeof window === undefined)
    return {};

  return Object.keys(breakpoints).reduce((acc, act) => {

    return {
      ...acc,
      [act]: mediaQuery({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query: `(${media}-width: ${breakpoints[act]})`,
      }),
    };
  }, {});
};

export default useBreakpoints;
