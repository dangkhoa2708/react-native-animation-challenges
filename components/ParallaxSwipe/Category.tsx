import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Helper from '../../Helper';

type CategoryProps = {
  text: string;
  isActive: boolean;
  style?: StyleProp<ViewStyle>;
};

const activeStyle: StyleProp<ViewStyle> = {
  backgroundColor: 'black',
};

const inActiveStyle: StyleProp<ViewStyle> = {
  backgroundColor: '#F4F4F4',
  borderWidth: 1,
  borderColor: '#D8D8D8',
};

const activeTextStyle: StyleProp<TextStyle> = {
  color: 'white',
  fontWeight: 'bold',
};

const inActiveTextStyle: StyleProp<TextStyle> = {
  color: '#1F2732',
  opacity: 0.7,
};

export default function Category({ text, isActive, style }: CategoryProps) {
  const containerStyle = isActive ? activeStyle : inActiveStyle;
  const textStyle = isActive ? activeTextStyle : inActiveTextStyle;
  return (
    <View style={[styles.container, containerStyle, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Helper.normalize(7),
    paddingHorizontal: Helper.normalize(14),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Helper.normalize(18),
  },
  text: {
    fontSize: Helper.normalize(14),
  },
});
