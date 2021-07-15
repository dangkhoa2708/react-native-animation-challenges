import React, { forwardRef } from 'react';
import { StyleProp, ViewStyle, StyleSheet, Text, View } from 'react-native';

type StatusTextProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

const StatusText = forwardRef(
  ({ text, style = {} }: StatusTextProps, ref: any) => {
    return (
      <View style={[styles.container, style]} ref={ref}>
        <Text
          style={[styles.text, { color: text == 'NOPE' ? 'red' : 'green' }]}>
          {text}
        </Text>
      </View>
    );
  },
);

export default StatusText;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 3,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 5,
  },
});
