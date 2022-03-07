import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import constants from '../../constants';
import Helper from '../../Helper';
import { useInternal } from '../../hooks/useInternal';
import { usePortal } from '../../hooks/usePortal';
import MenuItemComp from './MenuItemComp';
import { MenuItem } from './types';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const AnimateBlurView = Animated.createAnimatedComponent(BlurView);
const MIDDLE_GAP = Helper.normalize(10);

const MenuList = ({ items }: { items: Array<MenuItem> }) => {
  return (
    <View style={styles.menuListCon}>
      {items.map(e => {
        return <MenuItemComp key={e.text} item={e} />;
      })}
    </View>
  );
};

export default function Menu() {
  const { menuItems, menuProps, isMenuOpened } = useInternal();
  const { node, updateNode } = usePortal();
  const {
    MENU_ITEM_HEIGHT,
    MENU_WIDTH,
    INSET_GAP,
    EXTRA_BOTTOM,
    HOLD_ITEM_TRANSFORM_DURATION,
  } = constants;

  const clearNode = () => {
    updateNode(undefined);
  };

  const onEnd = () => {
    isMenuOpened.value = 0;
    clearNode();
  };

  const animatedBlurStyle = useAnimatedStyle(() => {
    const opacity = isMenuOpened.value == 1 ? 1 : 0;

    return {
      opacity,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = isMenuOpened.value ? 1 : 0;
    const viewHeight =
      menuProps.value.anchorY +
      menuItems.length * MENU_ITEM_HEIGHT +
      MIDDLE_GAP +
      INSET_GAP +
      menuProps.value.anchorHeight;
    const isExceedHeight = viewHeight > windowHeight;
    console.log(viewHeight, windowHeight);
    const exceedNumber = Math.abs(viewHeight - windowHeight) + EXTRA_BOTTOM;
    const top = isExceedHeight
      ? menuProps.value.anchorY - exceedNumber
      : menuProps.value.anchorY;
    const left = menuProps.value.anchorX;

    return {
      left,
      top,
      opacity,
    };
  }, [menuItems, menuProps]);

  const animatedMenuListStyle = useAnimatedStyle(() => {
    const menuEndX = menuProps.value.anchorX + MENU_WIDTH + INSET_GAP;
    if (menuEndX > windowWidth) {
      return {
        left: -Math.abs(menuProps.value.anchorWidth - MENU_WIDTH),
      };
    }

    return {};
  }, [menuItems, menuProps]);

  if (node) {
    return (
      <TouchableWithoutFeedback onPress={onEnd}>
        <View style={[StyleSheet.absoluteFillObject]}>
          <AnimateBlurView
            style={[
              {
                flex: 1,
              },
              animatedBlurStyle,
            ]}
            intensity={100}
          />
          <Animated.View style={[styles.menuCon, animatedStyle]}>
            {node}
            <Animated.View style={animatedMenuListStyle}>
              <MenuList items={menuItems} />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  menuCon: {
    position: 'absolute',
  },
  menuListCon: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: MIDDLE_GAP,
  },
});
