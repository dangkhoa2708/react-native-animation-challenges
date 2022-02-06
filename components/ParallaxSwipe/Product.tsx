import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Helper from '../../Helper';

type ProductProps = {
  name: string;
  price: string;
  source: ImageSourcePropType;
};

const { width } = Dimensions.get('window');
const imgSize = width * 0.3;

export default function Product({ name, price, source }: ProductProps) {
  return (
    <View style={[styles.container]}>
      <Image style={styles.img} source={source} />
      <View
        style={{
          alignSelf: 'stretch',
          width: width - imgSize - 50,
          justifyContent: 'space-around',
          marginLeft: Helper.normalize(24),
        }}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {name}
        </Text>
        <Text style={styles.text}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Helper.normalize(16),
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: Helper.normalize(16),
  },
  img: {
    width: imgSize,
    height: imgSize * 0.6,
    resizeMode: 'contain',
  },
  title: {
    fontSize: Helper.normalize(16),
    fontWeight: '500',
  },
  text: {
    fontSize: Helper.normalize(14),
    color: 'rgba(0,0,0,0.5)',
  },
});
