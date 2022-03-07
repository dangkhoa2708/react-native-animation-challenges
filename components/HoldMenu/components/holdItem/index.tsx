import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
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
  const containerRef = useAnimatedRef<Animated.View>();
  const animateScale = useSharedValue(1);
  const isActived = useSharedValue(false);

  useAnimatedReaction(
    () => {
      return isMenuOpened.value;
    },
    result => {
      if (result == 0 && isActived.value) {
        isActived.value = false;
      }
    },
  );

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

  const setUpUI = () => {
    updateNode(children);
    setMenuItems(menuItems);
  };

  const onCompleteHold = () => {
    setTimeout(() => {
      animateScale.value = HOLD_ITEM_SCALE_NORMAL;
      isMenuOpened.value = 1;
      isActived.value = true;
    }, HOLD_ITEM_TRANSFORM_DURATION);
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
      onStart: event => {
        runOnJS(setUpUI)();
        const measured = measure(containerRef);

        menuProps.value = {
          anchorHeight: measured.height,
          anchorWidth: measured.width,
          anchorX: measured.x,
          anchorY: measured.y,
        };
      },
      onActive: event => {
        scaleHold();
      },
      onEnd: () => {
        // scaleEnd();
      },
    });

  return useMemo(() => {
    return (
      <LongPressGestureHandler
        minDurationMs={HOLD_ITEM_TRANSFORM_DURATION}
        onGestureEvent={onGestureEvent}>
        <Animated.View style={[style, animatedStyle]} ref={containerRef}>
          {children}
        </Animated.View>
      </LongPressGestureHandler>
    );
  }, [children]);
}
