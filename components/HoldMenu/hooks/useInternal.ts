import { useContext } from 'react';
import { InternalContext } from '../context/InternalContext';

export const useInternal = () => useContext(InternalContext);
