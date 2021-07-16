import React from 'react';
import { View } from 'react-native';
import { NUMBER_OF_LINES, WORD_HEIGHT } from './Layout';

export default function LinesAnswer() {
  return (
    <View>
      {new Array(NUMBER_OF_LINES).fill(0).map((_, index) => {
        return (
          <View
            key={index}
            style={{
              top: index * WORD_HEIGHT,
              height: 3,
              backgroundColor: '#E6E5E6',
            }}
          />
        );
      })}
    </View>
  );
}
