import { useContext } from 'react';
import { PortalContext } from '../simplePortal/context/PortalContext';

export const usePortal = () => useContext(PortalContext);
