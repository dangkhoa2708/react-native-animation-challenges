import React from 'react';
import { View } from 'react-native';
import { GAP, WORD_HEIGHT } from './Layout';
import { OffSetItem } from './WordContainer';
type PlaceholderProps = {
  offset: OffSetItem;
};

export default function Placeholder({ offset }: PlaceholderProps) {
  return (
    <View
      style={{
        backgroundColor: '#bfbfbf',
        position: 'absolute',
        top: offset.originalY.value + 5 + GAP,
        left: offset.originalX.value,
        width: offset.width.value - 5,
        height: WORD_HEIGHT - 4,
        borderRadius: 10,
      }}
    />
  );
}
