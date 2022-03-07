import { ReactElement, ReactNode } from 'react';
import Animated from 'react-native-reanimated';
import { MenuInfo, MenuItem } from '../components/menu/types';

export type InternalState = {
  menuProps: Animated.SharedValue<MenuInfo>;
  isMenuOpened: Animated.SharedValue<number>;
  menuItems: Array<MenuItem>;
  setMenuItems: React.Dispatch<React.SetStateAction<Array<MenuItem>>>;
};

export type PortalState = {
  updateNode: React.Dispatch<React.SetStateAction<ReactElement | ReactNode>>;
  node: ReactElement | ReactNode;
};
