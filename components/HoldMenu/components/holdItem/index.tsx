import React, { ReactElement, useMemo, useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import constants from '../../constants';
import { useInternal } from '../../hooks/useInternal';
import { usePortal } from '../../hooks/usePortal';
import { MenuItem } from '../menu/types';

type HoldItemProps = {
  children: ReactElement;
  menuItems: Array<MenuItem>;
  style?: StyleProp<ViewStyle>;
};
export default function HoldItem({
  children,
  menuItems,
  style,
}: HoldItemProps) {
  const { menuProps, isMenuOpened, setMenuItems } = useInternal();
  const { updateNode } = usePortal();
  const animateScale = useSharedValue(1);
  const isActived = useSharedValue(false);
  const viewRef = useRef<View>(null);

  useAnimatedReaction(
    () => {
      return isMenuOpened.value;
    },
    result => {
      if (result < 1 && isActived.value) {
        isActived.value = false;
      }
    },
  );

  const setUpUI = () => {
    updateNode(children);
    setMenuItems(menuItems);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = isActived.value ? 0 : 1;
    return {
      transform: [
        {
          scale: animateScale.value,
        },
      ],
      opacity,
    };
  });

  const {
    HOLD_ITEM_SCALE_DOWN_VALUE,
    HOLD_ITEM_TRANSFORM_DURATION,
    HOLD_ITEM_SCALE_NORMAL,
  } = constants;

  const onCompleteHold = () => {
    isActived.value = true;

    isMenuOpened.value = withTiming(
      1,
      {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      },
      () => {
        animateScale.value = HOLD_ITEM_SCALE_NORMAL;
      },
    );
  };

  const calculateMenuProps = () => {
    setUpUI();

    viewRef.current &&
      viewRef.current.measureInWindow((x, y, width, height) => {
        menuProps.value = {
          anchorHeight: height,
          anchorWidth: width,
          anchorX: x,
          anchorY: y,
        };
      });
  };

  const scaleHold = () => {
    'worklet';
    animateScale.value = withTiming(
      HOLD_ITEM_SCALE_DOWN_VALUE,
      {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      },
      () => {
        runOnJS(onCompleteHold)();
      },
    );
  };

  const onGestureEvent =
    useAnimatedGestureHandler<LongPressGestureHandlerGestureEvent>({
      onStart: () => {
        runOnJS(calculateMenuProps)();
      },
      onActive: () => {
        scaleHold();
      },
    });

  return useMemo(() => {
    return (
      <LongPressGestureHandler
        minDurationMs={HOLD_ITEM_TRANSFORM_DURATION}
        onGestureEvent={onGestureEvent}>
        <Animated.View style={[style, animatedStyle]}>
          <View ref={viewRef}>{children}</View>
        </Animated.View>
      </LongPressGestureHandler>
    );
  }, [children]);
}
