import { createContext } from 'react';
import { ThemeVariant } from './Theme';

export const ThemeVariantContext = createContext<ThemeVariant>('light');

export const VariantProvider = ThemeVariantContext.Provider;
export const VariantConsumer = ThemeVariantContext.Consumer;
