import React, { ReactElement, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { InternalContext } from '../../context/InternalContext';
import PortalProvider from '../../simplePortal/provider/PortalProvider';
import { InternalState } from '../../state/internal';
import Menu from '../menu';
import { MenuItem } from '../menu/types';

type HoldMenuProviderProps = {
  children?: ReactElement;
};

export default function HoldMenuProvider({ children }: HoldMenuProviderProps) {
  const [menuItemState, setMenuItemState] = useState<Array<MenuItem>>([]);
  const defaultValue: InternalState = {
    menuProps: useSharedValue({
      anchorHeight: 0,
      anchorWidth: 0,
      anchorX: 0,
      anchorY: 0,
    }),
    isMenuOpened: useSharedValue(0),
    menuItems: menuItemState,
    setMenuItems: setMenuItemState,
  };
  return (
    <InternalContext.Provider value={defaultValue}>
      <PortalProvider>
        <>
          {children}
          <Menu />
        </>
      </PortalProvider>
    </InternalContext.Provider>
  );
}
