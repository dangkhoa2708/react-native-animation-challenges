import { createContext } from 'react';
import { InternalState } from '../state/internal';

export const InternalContext = createContext<InternalState>(undefined as any);
