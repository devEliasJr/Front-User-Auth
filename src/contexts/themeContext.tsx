import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { DarkTheme, LightTheme } from "../themes";

const ThemeContext = createContext({} as IThemeContext);

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default function AppThemeProvider({ children }: any) {
  const [themeName, setThemeName] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const getTheme = localStorage.getItem("ThemeContextDefault");
    if (getTheme === "dark" || getTheme === "light") {
      return setThemeName(getTheme);
    }
    return;
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemename) => {
      const newThemeName = oldThemename === "light" ? "dark" : "light";
      localStorage.setItem("ThemeContextDefault", newThemeName);
      return newThemeName;
    });
  }, []);

  const theme = useMemo(() => {
    if (themeName === "dark") return DarkTheme;

    return LightTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
