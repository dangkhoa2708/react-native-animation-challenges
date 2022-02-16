import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import images from '../../common/images';
import { assets } from './config';

type BoxProps = {
  progress: Animated.SharedValue<number>;
  onPressBuy: () => void;
};

export default function Box({ progress, onPressBuy }: BoxProps) {
  const movingProgress = useSharedValue(0);
  const [showFakeCount, setShowFakeCount] = useState(false);

  useAnimatedReaction(
    () => {
      return progress.value;
    },
    result => {
      if (result == 1) {
        movingProgress.value = withTiming(
          1,
          {
            duration: 250,
          },
          () => {
            runOnJS(setShowFakeCount)(true);
          },
        );
      }
    },
  );
  const animatedStyle = useAnimatedStyle(() => {
    const rotateX = interpolate(
      progress.value,
      [0.5, 1],
      [0, 140],
      Extrapolate.CLAMP,
    );
    const top = interpolate(
      progress.value,
      [0.5, 1],
      [-35, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ rotateX: `${rotateX}deg` }],
      top,
    };
  });

  const animatedBottomStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      progress.value,
      [0.5, 0.75, 1],
      [0, 5, -2],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ translateY }],
    };
  });

  const animatedContainer = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, 0.2, 0.21, 1],
      [0, 0, 1, 1],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      progress.value,
      [0, 0.5, 1],
      [1, 1, 0.5],
      Extrapolate.CLAMP,
    );
    const translateX = interpolate(
      movingProgress.value,
      [0, 1],
      [0, 300],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      movingProgress.value,
      [0, 1],
      [0, -100],
      Extrapolate.CLAMP,
    );
    const anotherOpacity = interpolate(
      movingProgress.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacity && anotherOpacity,
      transform: [{ scale }, { translateX }, { translateY }],
    };
  });
  return (
    <View
      style={{
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
      }}>
      <TouchableOpacity
        onPress={onPressBuy}
        style={{
          alignSelf: 'flex-end',
          marginRight: 20,
        }}>
        <Image style={styles.icon} source={images.imgShoppingCart} />
        {showFakeCount && (
          <View style={styles.fakeCountCon}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>1</Text>
          </View>
        )}
      </TouchableOpacity>
      <Animated.View style={[{ alignSelf: 'center' }, animatedContainer]}>
        <Animated.Image
          style={[styles.image, { marginTop: 10 }, animatedBottomStyle]}
          source={assets.PizzaBoxBottom}
        />
        <Animated.Image
          style={[
            styles.image,

            {
              position: 'absolute',
            },
            animatedStyle,
          ]}
          source={assets.PizzaBoxTop}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  fakeCountCon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: -5,
    top: -5,
  },
});
