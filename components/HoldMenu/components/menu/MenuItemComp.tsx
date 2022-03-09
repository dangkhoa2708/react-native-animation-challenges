import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Helper from '../../../../Helper';
import constants, { lightColor } from '../../constants';
import { MenuItem } from './types';

type MenuItemProps = {
  item: MenuItem;
  style?: StyleProp<ViewStyle>;
  shouldIgnoreSeparator?: boolean;
};

const AnimateTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function MenuItemComp({
  item,
  style,
  shouldIgnoreSeparator = false,
}: MenuItemProps) {
  const shouldRenderSeparator = !shouldIgnoreSeparator && item.withSeparator;

  const animateStyle = {
    borderColor: lightColor.menuItem.separator,
    backgroundColor: lightColor.menuItem.background,
  };

  const animateTextStyle = {
    color: lightColor.menuItem.contentColor,
  };

  return (
    <AnimateTouchable
      activeOpacity={0.5}
      style={[
        styles.container,
        shouldRenderSeparator && { borderBottomWidth: 0.5 },
        animateStyle,
        style,
      ]}
      onPress={item.onPress}>
      <Animated.Text style={[styles.text, animateTextStyle]}>
        {item.text}
      </Animated.Text>
      {item.icon && <Animated.Image source={item.icon} />}
    </AnimateTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Helper.normalize(constants.MENU_WIDTH),
    height: Helper.normalize(constants.MENU_ITEM_HEIGHT),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Helper.normalize(16),
  },
  text: {
    fontSize: Helper.normalize(14),
  },
});
