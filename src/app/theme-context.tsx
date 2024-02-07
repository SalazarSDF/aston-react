import { createContext, useContext } from "react";

import useLocalStorageState from "../shared/use-local-storage";

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
ThemeContext.displayName = "theme-context";

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorageState("theme", "light");
  const value = { theme, setTheme } as ThemeContextType;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      `useShopCartContext must be used within a ShopCartContextProvider`,
    );
  }
  return context;
}

export { ThemeContextProvider, useThemeContext };
