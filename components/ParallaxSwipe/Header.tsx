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

type HeaderProps = {
  title: string;
  rightText?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export default function Header({
  title,
  rightText,
  titleStyle,
  style,
}: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {rightText && <Text style={styles.text}>{rightText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Helper.normalize(16),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: Helper.normalize(26),
    fontWeight: 'bold',
  },
  text: {
    fontSize: Helper.normalize(18),
    fontWeight: 'bold',
  },
});
