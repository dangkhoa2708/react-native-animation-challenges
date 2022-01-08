import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Helper from '../../Helper';

type AttributeItemProps = {
  icon: ImageSourcePropType;
  text: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function AttributeItem({
  icon,
  text,
  style,
  imageStyle,
  textStyle,
}: AttributeItemProps) {
  return (
    <View style={[styles.container, style]}>
      <Image style={[styles.icon, imageStyle]} source={icon} />
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: Helper.normalize(20, 'height'),
    height: Helper.normalize(20, 'height'),
    resizeMode: 'contain',
  },
  text: {
    fontSize: Helper.normalize(18, 'height'),
    marginLeft: Helper.normalize(15),
    fontWeight: '600',
  },
});
