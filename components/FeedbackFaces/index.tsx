import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Helper from '../../Helper';
import FaceReaction from './FaceReaction';
import Slider from './Slider';

const { width } = Dimensions.get('screen');

const margin = Helper.normalize(48);
const sliderWidth = width - margin * 2;

export default function FeedbackFaces() {
  const slideValue = useSharedValue(0);

  const text = useSharedValue('Hideous');
  console.log('sliderWidth', sliderWidth);

  useAnimatedReaction(
    () => {
      return slideValue.value;
    },
    result => {
      if (result < sliderWidth / 2 - 50) {
        text.value = 'Hideous';
      } else if (result < sliderWidth - 50) {
        text.value = 'Ok';
      } else {
        text.value = 'Good';
      }
    },
  );
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      slideValue.value,
      [0, sliderWidth / 2, sliderWidth],
      ['#fcb5e8', '#fceab6', '#acfed4'],
    );
    return {
      backgroundColor: color,
    };
  });

  return (
    <Animated.View
      style={[{ flex: 1, alignItems: 'center' }, animatedBackgroundStyle]}>
      <Text
        style={{
          marginTop: Helper.normalize(80),
          fontSize: Helper.normalize(30),
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: 1.4,
        }}>
        {`How was\nyour ride ?`}
      </Text>

      <ReText
        style={{
          marginTop: Helper.normalize(30),

          fontSize: Helper.normalize(24),
        }}
        text={text}
      />
      <FaceReaction slideValue={slideValue} />
      <Slider
        sliderWidth={sliderWidth}
        style={{ marginTop: 140 }}
        slideValue={slideValue}
      />
    </Animated.View>
  );
}
