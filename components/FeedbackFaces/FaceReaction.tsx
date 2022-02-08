import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  addQuadraticCurve,
  close,
  createPath,
  interpolatePath,
} from 'react-native-redash';
import Svg, { Path } from 'react-native-svg';
import Helper from '../../Helper';
import SvgData from './SvgData';

type FaceReactionProps = {
  slideValue: Animated.SharedValue<number>;
  style?: StyleProp<ViewStyle>;
};
const { width } = Dimensions.get('screen');

const margin = Helper.normalize(48);

const sliderWidth = width - margin * 2;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function FaceReaction({ slideValue, style }: FaceReactionProps) {
  const input = [0, sliderWidth / 2, sliderWidth - 10];
  const animatedLeftEye = useAnimatedProps(() => {
    const data = interpolatePath(
      slideValue.value,
      input,
      [SvgData.SAD.leftEye, SvgData.NORMAL.leftEye, SvgData.HAPPY.leftEye],
      Extrapolate.CLAMP,
    );
    return {
      d: data,
    };
  });
  const animatedRightEye = useAnimatedProps(() => {
    const data = interpolatePath(
      slideValue.value,
      input,
      [SvgData.SAD.rightEye, SvgData.NORMAL.rightEye, SvgData.HAPPY.rightEye],
      Extrapolate.CLAMP,
    );

    return {
      d: data,
    };
  });

  const animatedMouth = useAnimatedProps(() => {
    const data = interpolatePath(slideValue.value, input, [
      SvgData.SAD.mouth,
      SvgData.NORMAL.mouth,
      SvgData.HAPPY.mouth,
    ]);

    return {
      d: data,
    };
  });

  const animatedEyeStyle = useAnimatedStyle(() => {
    const translateX = interpolate(slideValue.value, [0, sliderWidth], [0, 10]);
    const translateY = interpolate(slideValue.value, input, [0, -30, -25]);

    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View
      style={{
        transform: [
          {
            scale: 1.4,
          },
        ],
        marginTop: Helper.normalize(100),
      }}>
      <Svg width={200} height={200}>
        <AnimatedPath
          animatedProps={animatedLeftEye}
          stroke="black"
          strokeWidth="3"
          fill="white"
        />
        <AnimatedPath
          animatedProps={animatedRightEye}
          stroke="black"
          strokeWidth="3"
          fill="white"
        />
        <AnimatedPath
          animatedProps={animatedMouth}
          stroke="black"
          strokeWidth="3"
        />
      </Svg>
      <Animated.View
        style={[
          styles.eye,
          {
            top: 72,
            left: 40,
          },
          animatedEyeStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.eye,
          {
            top: 70,
            left: 148,
          },
          animatedEyeStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eye: {
    backgroundColor: 'black',
    width: Helper.normalize(8),
    height: Helper.normalize(8),
    borderRadius: Helper.normalize(4),
    position: 'absolute',
  },
});
