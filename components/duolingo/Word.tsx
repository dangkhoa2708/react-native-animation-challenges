import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { WORD_HEIGHT } from './Layout';

type WordProps = {
  name: string;
};

export default function Word({ name }: WordProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: '#bfbfbf',
    borderRadius: 10,
    height: WORD_HEIGHT,
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 14,
  },
});
