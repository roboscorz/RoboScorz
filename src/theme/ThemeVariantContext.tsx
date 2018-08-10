import { createContext } from 'react';
import { ThemeVariant } from './Theme';

export const ThemeVariantContext = createContext<ThemeVariant>('light');
