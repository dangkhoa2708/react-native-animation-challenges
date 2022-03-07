import React, { ReactElement, ReactNode, useState } from 'react';
import { View } from 'react-native';
import { PortalState } from '../../state/internal';
import { PortalContext } from '../context/PortalContext';

type PortalProviderType = {
  children: ReactElement;
};

export default function PortalProvider({ children }: PortalProviderType) {
  const [node, setNode] = useState<ReactNode>(undefined);
  const defaultValue: PortalState = {
    node,
    updateNode: setNode,
  };
  return (
    <PortalContext.Provider value={defaultValue}>
      {children}
    </PortalContext.Provider>
  );
}
