import { createContext } from 'react';
import { SurfaceBackground } from './Theme';

export const SurfaceContext = createContext<SurfaceBackground>('primary');

export const SurfaceProvider = SurfaceContext.Provider;
export const SurfaceConsumer = SurfaceContext.Consumer;
