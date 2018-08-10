import { createContext } from 'react';
import { SurfaceBackground } from './Theme';

export const SurfaceContext = createContext<SurfaceBackground>('primary');
