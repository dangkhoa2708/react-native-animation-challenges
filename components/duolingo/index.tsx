import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import images from '../../common/images';
import WordContainer from './WordContainer';

export default function Duolingo() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={images.imgDuolingo} />
      <WordContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    width: 400,
    height: 180,
    resizeMode: 'contain',
  },
});
