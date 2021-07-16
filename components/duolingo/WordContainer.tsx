import React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { runOnJS, runOnUI } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { GAP } from './Layout';
import LinesAnswer from './LinesAnswer';
import SortableCon from './SortableCon';
import Word from './Word';

type WordItem = {
  name: string;
  id: number;
};

export type OffSetItem = {
  order: Animated.SharedValue<number>;
  originalX: Animated.SharedValue<number>;
  originalY: Animated.SharedValue<number>;
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
  width: Animated.SharedValue<number>;
};

const data: Array<WordItem> = [
  {
    name: 'chơi',
    id: 0,
  },
  {
    name: 'dụng',
    id: 1,
  },
  {
    name: 'thành',
    id: 2,
  },
  {
    name: 'với',
    id: 3,
  },
  {
    name: 'sạch',
    id: 4,
  },
  {
    name: 'anh',
    id: 5,
  },
  {
    name: 'thoảng',
    id: 6,
  },
  {
    name: 'thỉnh',
    id: 7,
  },
  {
    name: 'ấy',
    id: 8,
  },
  {
    name: 'tôi',
    id: 9,
  },
  {
    name: 'chúng',
    id: 10,
  },
];

const renderWords = (offsets: Array<OffSetItem>) => {
  console.log('heyey');
  return data.map((e, index) => {
    return (
      <SortableCon key={e.id} index={index} offsets={offsets}>
        <Word name={e.name} />
      </SortableCon>
    );
  });
};

export default function WordContainer() {
  const [readyForPlay, setReadyForPlay] = useState(false);

  const offsets: Array<OffSetItem> = data.map(e => {
    return {
      order: useSharedValue(0),
      originalX: useSharedValue(0),
      originalY: useSharedValue(0),
      x: useSharedValue(0),
      y: useSharedValue(0),
      width: useSharedValue(0),
    };
  });

  if (!readyForPlay) {
    return (
      <View style={styles.container}>
        <View style={styles.wordCon}>
          {data.map((e, index) => {
            return (
              <View
                onLayout={({ nativeEvent }) => {
                  const offsetItem = offsets[index];
                  offsetItem.order.value = -1;
                  offsetItem.width.value = nativeEvent.layout.width;
                  offsetItem.originalX.value = nativeEvent.layout.x;
                  offsetItem.originalY.value = nativeEvent.layout.y;

                  runOnUI(() => {
                    'worklet';
                    if (offsets.every(e => e.order.value === -1)) {
                      runOnJS(setReadyForPlay)(true);
                    }
                  })();
                }}
                key={e.id}>
                <Word name={e.name} />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.container]}>
      <LinesAnswer />
      {renderWords(offsets)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 50,
  },
  wordCon: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: GAP,
  },
});
