import { createContext } from 'react';
import { RoboScorzTheme } from './RoboScorzTheme';

export const ThemeContext = createContext(RoboScorzTheme);

export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
