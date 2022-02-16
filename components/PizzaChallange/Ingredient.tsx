import { transform } from '@babel/core';
import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

type IngredientProps = {
  index: number;
  source: ImageSourcePropType;
  radius: number;
};

export default function Ingredient({ index, source, radius }: IngredientProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      Math.random() * 400,
      withTiming(1, { duration: 400 }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [5, 1]);
    const opacity = interpolate(progress.value, [0, 0.1, 1], [0, 1, 1]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius * Math.random();
  const y = Math.sin(angle) * radius * Math.random();

  return (
    <Animated.Image
      style={[
        styles.image,
        {
          position: 'absolute',
          zIndex: index,
          top: y + radius - 10,
          left: x + radius - 10,
        },
        animatedStyle,
      ]}
      source={source}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
