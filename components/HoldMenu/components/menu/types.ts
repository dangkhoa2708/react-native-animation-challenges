import { ImageSourcePropType } from 'react-native';

export type MenuItem = {
  text: string;
  icon?: ImageSourcePropType;
  onPress: () => void;
  withSeparator?: boolean;
};

export type MenuInfo = {
  anchorX: number;
  anchorY: number;
  anchorWidth: number;
  anchorHeight: number;
};
