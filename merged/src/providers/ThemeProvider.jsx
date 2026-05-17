import { createContext, useContext, useEffect, useMemo } from "react";
import { biomedicalTheme } from "@/themes/biomedical";
import { lifestyleTheme } from "@/themes/lifestyle";

const themes = {
  biomedical: biomedicalTheme,
  lifestyle: lifestyleTheme,
};

const ThemeContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ themeKey, children }) {
  const theme = useMemo(() => themes[themeKey] ?? themes.lifestyle, [themeKey]);

  useEffect(() => {
    const root = document.documentElement;
    const entries = Object.entries(theme);
    for (const [prop, value] of entries) {
      root.style.setProperty(prop, value);
    }
    return () => {
      for (const [prop] of entries) {
        root.style.removeProperty(prop);
      }
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
