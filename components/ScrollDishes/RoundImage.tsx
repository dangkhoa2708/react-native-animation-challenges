import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Helper from '../../Helper';

type RoundImageProps = {
  source: ImageSourcePropType;
  animateStyle?: Animated.AnimateStyle<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  size: number;
};

export default function RoundImage({
  source,
  animateStyle,
  style,
  size,
}: RoundImageProps) {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderRadius: size / 2,
          overflow: 'hidden',
        },
        style,
        animateStyle,
      ]}>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          resizeMode: 'cover',
          borderRadius: size / 2,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Helper.normalize(10),
    borderWidth: 1,
  },
});
