"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: Exclude<Theme, "system">;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey: _storageKey = "betterbeach-theme",
}: ThemeProviderProps) {
  void _storageKey;

  const [mode, setMode] = useState<Theme>(() => defaultTheme);
  const [systemTheme, setSystemTheme] =
    useState<Exclude<Theme, "system">>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (matches: boolean) => {
      setSystemTheme(matches ? "dark" : "light");
    };

    syncSystemTheme(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      syncSystemTheme(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }

    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  useEffect(() => {
    setMode(defaultTheme);
  }, [defaultTheme]);

  const resolvedTheme =
    mode === "system" ? systemTheme : (mode as Exclude<Theme, "system">);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = (value: Theme) => {
    setMode(value);
  };

  const value = useMemo(
    () => ({
      theme: mode,
      resolvedTheme,
      setTheme,
    }),
    [mode, resolvedTheme],
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
