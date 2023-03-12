import React, { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

export type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  isDark: boolean;
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
  switchTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  return useContext(ThemeContext) as ThemeContextType;
};

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  useEffect(() => {
    if (window !== undefined) {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const persistTheme = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }

  const isDark = useMemo(() => {
    return theme === 'dark';
  }, [theme]);

  const switchTheme = () => {
    if (theme === 'dark') {
      persistTheme('light');
    } else {
      persistTheme('dark');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        setTheme,
        switchTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
