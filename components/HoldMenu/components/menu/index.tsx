import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import constants, { shadow } from '../../constants';
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
    HOLD_ITEM_SCALE_UP_VALUE,
    HOLD_ITEM_SCALE_DOWN_VALUE,
  } = constants;

  const clearNode = () => {
    updateNode(undefined);
  };

  const onEnd = () => {
    isMenuOpened.value = withTiming(0, {
      duration: HOLD_ITEM_TRANSFORM_DURATION,
    });
    clearNode();
  };

  const animatedBlurStyle = useAnimatedStyle(() => {
    const opacity = isMenuOpened.value == 1 ? 1 : 0;

    return {
      opacity,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(isMenuOpened.value, [0, 1], [0, 1]);
    const viewHeight =
      menuProps.value.anchorY +
      menuItems.length * MENU_ITEM_HEIGHT +
      MIDDLE_GAP +
      INSET_GAP;
    menuProps.value.anchorHeight;

    const isExceedHeight = viewHeight > windowHeight - EXTRA_BOTTOM;
    const exceedNumber =
      Math.abs(viewHeight - windowHeight) + EXTRA_BOTTOM + INSET_GAP;
    const translateY = isExceedHeight
      ? interpolate(
          isMenuOpened.value,
          [0, 1],
          [menuProps.value.anchorY, menuProps.value.anchorY - exceedNumber],
        )
      : menuProps.value.anchorY;

    const translateX = menuProps.value.anchorX;

    return {
      transform: [
        {
          translateY,
        },
        {
          translateX,
        },
      ],
      opacity,
    };
  }, [menuItems, menuProps]);

  const animatedMenuListStyle = useAnimatedStyle(() => {
    const scale = interpolate(isMenuOpened.value, [0, 1], [0, 1]);
    const menuEndX = menuProps.value.anchorX + MENU_WIDTH + INSET_GAP;
    const translateX = -Math.abs(menuProps.value.anchorWidth - MENU_WIDTH) - 10;
    if (menuEndX > windowWidth) {
      return {
        // left: -Math.abs(menuProps.value.anchorWidth - MENU_WIDTH),
        transform: [{ scale }, { translateX }],
      };
    }

    return {
      transform: [{ scale }],
    };
  }, [menuItems, menuProps]);

  const animatedNodeStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      isMenuOpened.value,
      [0, 1],
      [HOLD_ITEM_SCALE_DOWN_VALUE, HOLD_ITEM_SCALE_UP_VALUE],
    );
    return {
      transform: [{ scale }],
      width: menuProps.value.anchorWidth,
      height: menuProps.value.anchorHeight,
    };
  }, [menuProps]);

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
            <Animated.View style={animatedNodeStyle}>{node}</Animated.View>
            <Animated.View style={[animatedMenuListStyle, shadow(0.3)]}>
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
    alignItems: 'baseline',
  },
  menuListCon: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: MIDDLE_GAP,
  },
});
