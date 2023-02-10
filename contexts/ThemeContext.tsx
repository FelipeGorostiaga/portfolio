import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  return useContext(ThemeContext) as ThemeContextType;
};

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
