import React, { useEffect, useRef } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Helper from '../../Helper';

type ShoeCardProps = {
  enableShareElement?: boolean;
  source: ImageSourcePropType;
  backgroundColor: string;
  name: string;
  price: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  size: number;
  scrollValue?: Animated.SharedValue<number>;
  index?: number;
  onNavigate: (x: number, y: number) => void;
  style?: StyleProp<ViewStyle>;
  absoluteX?: number;
  absoluteY?: number;
  progress?: Animated.SharedValue<number>;
};

const rightMargin = Helper.normalize(24);

export default function ShoeCard({
  source,
  backgroundColor,
  name,
  price,
  textPrimaryColor,
  textSecondaryColor,
  size,
  scrollValue,
  index,
  onNavigate,
  style,
  absoluteX = 0,
  absoluteY = 0,
  progress = useSharedValue(0),
  enableShareElement,
}: ShoeCardProps) {
  const shoeWidth = size + 50;
  const boxSize = size - rightMargin;

  const cardRef = useRef<View>(null);

  const onPress = () => {
    cardRef.current &&
      cardRef.current.measureInWindow((x, y, width, height) => {
        onNavigate(x, y);
      });
  };

  const animateRotateStyle = useAnimatedStyle(() => {
    if (scrollValue && index !== undefined) {
      const rotateVal = interpolate(
        scrollValue.value,
        [size * (index - 1), size * index, size * (index + 1)],
        [-60, -30, 0],
      );
      return {
        transform: [{ rotate: `${rotateVal}deg` }],
      };
    } else {
      return {};
    }
  });

  const animatedRectStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    left: absoluteX,
    top: absoluteY,
  };

  const animatedBoxStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, 3],
      Extrapolate.CLAMP,
    );
    const translateX = interpolate(
      progress.value,
      [0, 0.75],
      [0, 50],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      progress.value,
      [0, 0.75],
      [0, -180],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      progress.value,
      [0, 0.7, 1],
      [16, boxSize * 0.6, boxSize * 1.5],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        { scale: scale },
        {
          translateY,
        },
        {
          translateX,
        },
      ],
      borderRadius: borderRadius,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.1, 1], [1, 0, 0]);

    return {
      opacity: opacity,
    };
  });

  const animateRotateProgressStyle = useAnimatedStyle(() => {
    const rotateVal = interpolate(
      progress.value,
      [0, 0.8],
      [-30, 0],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      progress.value,
      [0, 0.8],
      [0, -160],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ rotate: `${rotateVal}deg` }, { translateY }],
    };
  });

  const rotateStyle = enableShareElement
    ? animateRotateProgressStyle
    : animateRotateStyle;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        ref={cardRef}
        style={[
          { width: size, height: size },
          enableShareElement && animatedRectStyle,

          style,
        ]}>
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: backgroundColor,
              width: boxSize,
              height: boxSize,
            },
            enableShareElement && animatedBoxStyle,
          ]}>
          <Animated.View style={[{ flex: 1 }, animatedTextStyle]}>
            <Text style={[styles.name, { color: textPrimaryColor }]}>
              {name}
            </Text>
            <Text style={[styles.price, { color: textSecondaryColor }]}>
              {price}
            </Text>
            <View
              style={[styles.line, { backgroundColor: textSecondaryColor }]}
            />
          </Animated.View>
        </Animated.View>

        <Animated.Image
          style={[
            {
              width: shoeWidth,
              resizeMode: 'cover',
              position: 'absolute',
              bottom: 0,
              left: Helper.normalize(-15),
            },
            rotateStyle,
          ]}
          source={source}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginRight: rightMargin,
    flex: 1,
    paddingHorizontal: Helper.normalize(24),
    paddingVertical: Helper.normalize(32),
  },
  name: {
    fontSize: Helper.normalize(24),
    fontWeight: '700',
  },
  price: {
    fontSize: Helper.normalize(18),
    fontWeight: '400',
    marginVertical: Helper.normalize(8),
  },
  line: {
    flexGrow: 1,
    width: 0.5,
    marginLeft: Helper.normalize(5),
  },
});
