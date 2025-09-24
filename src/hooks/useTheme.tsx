import { useState, useEffect, useContext, createContext, ReactNode } from 'react';

export type Theme = 'dark' | 'light' | 'high-contrast';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hctimer-theme');
      if (stored && (stored === 'dark' || stored === 'light' || stored === 'high-contrast')) {
        setThemeState(stored as Theme);
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save theme to localStorage (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('hctimer-theme', theme);
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
    }
  }, [theme, isLoaded]);

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'high-contrast'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};