import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Helper from '../../Helper';

type ShoeSelectionProps = {
  source: ImageSourcePropType;
  isActive: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function ShoeSelection({
  source,
  isActive,
  style,
}: ShoeSelectionProps) {
  const additionContainerStyle: StyleProp<ViewStyle> = isActive && {
    borderColor: 'black',
    borderWidth: 2,
  };
  return (
    <View style={[styles.container, additionContainerStyle, style]}>
      <Image style={styles.img} source={source} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: Helper.normalize(80),
    // height: Helper.normalize(80),
    padding: Helper.normalize(5),
    borderRadius: Helper.normalize(16),
  },
  img: {
    backgroundColor: '#DEE3EB',
    width: Helper.normalize(75),
    height: Helper.normalize(75),
    borderRadius: Helper.normalize(16),

    resizeMode: 'contain',
  },
});
