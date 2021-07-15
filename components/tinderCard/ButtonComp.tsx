import React from 'react';
import {
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

type ButtonCompProps = {
  color: string;
  style?: StyleProp<ViewStyle>;
  icon: ImageSourcePropType;
  active: boolean;
};

export default function ButtonComp({
  color,
  style = {},
  icon,
  active,
}: ButtonCompProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: color },
        style,
        active && { backgroundColor: color },
      ]}>
      <Image
        style={[styles.icon, { tintColor: active ? 'white' : color }]}
        source={icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
