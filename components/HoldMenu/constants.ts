import { Dimensions, Platform, StatusBar } from 'react-native';
import Helper from './Helper';

const { width, height: screenHeight } = Dimensions.get('screen');
const { height: windowHeight } = Dimensions.get('window');

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (screenHeight >= 812 || width >= 812);

const HOLD_ITEM_TRANSFORM_DURATION = 250;
const HOLD_ITEM_SCALE_DOWN_VALUE = 0.95;
const HOLD_ITEM_SCALE_NORMAL = 1;
const MENU_WIDTH = width * 0.5;
const MENU_ITEM_HEIGHT = Helper.normalize(40);
const INSET_GAP = Helper.normalize(20);
const EXTRA_BOTTOM = isIphoneX ? 34 : 0;

const NAV_BAR_HEIGHT =
  Platform.OS === 'ios'
    ? 0
    : screenHeight - windowHeight - (StatusBar.currentHeight ?? 0);

export const lightColor = {
  menuItem: {
    background: '#e6e6e6',
    contentColor: 'black',
    separator: '#bfbfbf',
  },
};

const darkColor = {
  menuItem: {
    background: '#333333',
    contentColor: 'white',
    separator: '#e6e6e6',
  },
};

export default {
  HOLD_ITEM_TRANSFORM_DURATION,
  HOLD_ITEM_SCALE_DOWN_VALUE,
  HOLD_ITEM_SCALE_NORMAL,
  MENU_WIDTH,
  MENU_ITEM_HEIGHT,
  INSET_GAP,
  NAV_BAR_HEIGHT,
  EXTRA_BOTTOM,
};
