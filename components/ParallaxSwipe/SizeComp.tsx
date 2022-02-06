import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Helper from '../../Helper';

type SizeCompProps = {
  size: string;
  style?: StyleProp<ViewStyle>;
  isOutOfStock: boolean;
  isSelected: boolean;
};

const { width } = Dimensions.get('window');

const widthItem = (width - Helper.normalize(24 + 24 + 16 * 3)) / 4;

export default function SizeComp({
  size,
  style,
  isOutOfStock,
  isSelected,
}: SizeCompProps) {
  return (
    <View
      style={[
        styles.container,
        isOutOfStock && { backgroundColor: '#F6F6F6' },
        isSelected && { borderColor: 'black', borderWidth: 2 },
        style,
      ]}>
      <Text
        style={[
          styles.text,
          isOutOfStock && { opacity: 0.3 },
          isSelected && { fontWeight: 'bold' },
        ]}>
        {size}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthItem,
    paddingVertical: Helper.normalize(8),
    borderRadius: Helper.normalize(16),
    borderWidth: 0.5,
    borderColor: '#DEE3EB',
    alignItems: 'center',
  },
  text: {
    fontSize: Helper.normalize(14),
  },
});
