import { transform } from '@babel/core';
import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Helper from '../../Helper';

type SliderProps = {
  slideValue: Animated.SharedValue<number>;
  style?: StyleProp<ViewStyle>;
  sliderWidth: number;
};

const sizeButton = Helper.normalize(60);
const dotSize = sizeButton / 4;
const correctionDot = sizeButton / 2;
const activeSizeButton = sizeButton + 5;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Slider({
  slideValue,
  style,
  sliderWidth,
}: SliderProps) {
  const buttonSize = useSharedValue(sizeButton);

  const animatedSizeStyle = useAnimatedStyle(() => {
    const size = buttonSize.value;
    return {
      width: size,
      height: size,
    };
  });
  const animatedPostionStyle = useAnimatedStyle(() => {
    return {
      left: slideValue.value - correctionDot,
    };
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      xPos: number;
    }
  >({
    onStart: (event, ctx) => {
      ctx.xPos = slideValue.value;
    },
    onActive: (event, ctx) => {
      const currentX = event.translationX + ctx.xPos;
      if (currentX >= 0 && currentX <= sliderWidth) {
        slideValue.value = currentX;
      }

      if (buttonSize.value != activeSizeButton) {
        buttonSize.value = activeSizeButton;
      }
    },
    onEnd: () => {
      buttonSize.value = sizeButton;
    },
  });
  return (
    <View style={[styles.container, { width: sliderWidth }, style]}>
      <View style={styles.line} />

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <AnimatedTouchableOpacity
          onPressIn={() => {
            buttonSize.value = activeSizeButton;
          }}
          onPress={() => {
            buttonSize.value = sizeButton;
          }}
          activeOpacity={1}
          style={[styles.dotHolder, animatedPostionStyle, animatedSizeStyle]}>
          <View style={styles.dot} />
        </AnimatedTouchableOpacity>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: sizeButton,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#808080',
  },
  dotHolder: {
    borderRadius: Helper.normalize(20),
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: dotSize,
    height: dotSize,
    borderRadius: sizeButton / 6,
    backgroundColor: 'black',
  },
});
