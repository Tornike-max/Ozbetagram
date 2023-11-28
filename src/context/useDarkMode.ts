import { useContext } from "react";
import { DarkContext } from "./DarkModeContext";

export function useDarkMode() {
  const context = useContext(DarkContext);

  if (context === undefined)
    throw new Error("You use context outside of DarkModeContext");

  return context;
}
