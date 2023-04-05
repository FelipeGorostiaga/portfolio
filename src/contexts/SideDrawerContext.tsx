import React, { type Dispatch, type SetStateAction, useContext, useState } from 'react';

interface SideDrawerContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SideDrawerContext = React.createContext<SideDrawerContextType | null>(null);

export const useSideDrawer = () => {
  return useContext(SideDrawerContext) as SideDrawerContextType;
};

const SideDrawerProvider = ({ children }: { children: JSX.Element }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SideDrawerContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SideDrawerContext.Provider>
  );
};

export default SideDrawerProvider;

