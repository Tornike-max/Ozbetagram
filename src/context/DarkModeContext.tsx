import { createContext, useState } from "react";

interface IThemeContext {
  dark: boolean;
  handleDarkToggle?: () => void;
}

const defaultState = {
  dark: false,
};

export const DarkContext = createContext<IThemeContext>(defaultState);

export default function DarkModeContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);
  function handleDarkToggle() {
    setDark((dark) => !dark);
  }
  return (
    <DarkContext.Provider value={{ dark, handleDarkToggle }}>
      {children}
    </DarkContext.Provider>
  );
}
