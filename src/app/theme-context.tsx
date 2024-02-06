import useLocalStorageState from "../shared/use-local-storage";

import { createContext, useContext } from "react";

type ThemeContextType = {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
ThemeContext.displayName = "theme-context";

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorageState("theme", "light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
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
