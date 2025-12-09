/**
 * ThemeProvider for VibeRN Design System
 *
 * @description Provides theme context with automatic light/dark mode support
 *
 * @ai-guide
 * Features:
 * - Automatic system theme detection
 * - Manual theme override
 * - Persistent theme preference (via AsyncStorage)
 * - Type-safe theme access
 *
 * Usage:
 * ```tsx
 * // In _layout.tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 *
 * // In any component
 * const { theme, mode, setMode, isDark } = useTheme();
 * ```
 *
 * To modify theme behavior:
 * - Change `defaultMode` for different default
 * - Modify storage key to reset user preferences
 * - Add more theme modes by extending ThemeMode type
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeMode, lightTheme, darkTheme } from './theme';

// Storage key for theme preference
const THEME_STORAGE_KEY = '@vibern/theme-mode';

// Context value type
interface ThemeContextValue {
  /** Current theme object with all tokens */
  theme: Theme;
  /** Current theme mode ('light', 'dark', or 'system') */
  mode: ThemeMode;
  /** Whether dark mode is currently active */
  isDark: boolean;
  /** Set the theme mode */
  setMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark (ignores system) */
  toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  mode: 'system',
  isDark: false,
  setMode: () => {},
  toggleTheme: () => {},
});

// Provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial theme mode (default: 'system') */
  defaultMode?: ThemeMode;
}

/**
 * ThemeProvider Component
 *
 * Wraps your app to provide theme context.
 * Automatically handles system theme changes and persists user preference.
 */
export function ThemeProvider({ children, defaultMode = 'system' }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
          setModeState(saved as ThemeMode);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadThemePreference();
  }, []);

  // Set mode and persist to storage
  const setMode = useCallback(async (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newMode =
      mode === 'dark' || (mode === 'system' && systemColorScheme === 'dark') ? 'light' : 'dark';
    setMode(newMode);
  }, [mode, systemColorScheme, setMode]);

  // Determine if dark mode is active
  const isDark = mode === 'dark' || (mode === 'system' && systemColorScheme === 'dark');

  // Select theme based on mode
  const theme = isDark ? darkTheme : lightTheme;

  // Context value
  const value: ThemeContextValue = {
    theme,
    mode,
    isDark,
    setMode,
    toggleTheme,
  };

  // Don't render until theme preference is loaded to prevent flash
  if (!isLoaded) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * useTheme Hook
 *
 * Access theme context from any component.
 *
 * @example
 * ```tsx
 * const { theme, isDark, toggleTheme } = useTheme();
 *
 * return (
 *   <View style={{ backgroundColor: theme.colors.background }}>
 *     <Button onPress={toggleTheme}>
 *       {isDark ? 'Light Mode' : 'Dark Mode'}
 *     </Button>
 *   </View>
 * );
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

// Export context for advanced use cases
export { ThemeContext };
