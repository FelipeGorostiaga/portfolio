import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

type ThemeType = 'dark' | 'light';

interface ThemeContextType {
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

  const switchTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        switchTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
