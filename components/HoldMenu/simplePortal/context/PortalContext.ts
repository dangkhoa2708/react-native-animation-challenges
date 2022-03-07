import { createContext } from 'react';
import { PortalState } from '../../state/internal';

export const PortalContext = createContext<PortalState>(undefined as any);
