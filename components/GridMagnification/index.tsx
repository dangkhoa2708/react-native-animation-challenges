import React from 'react';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { APP_ICONS } from './appIcons';
import AppItem from './AppItem';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const COL = 9;
export const ROW = 18;

export default function GridMaginication() {
  const touchPos = useSharedValue<{ x: number; y: number } | null>(null);
  const isGestureActive = useSharedValue(false);

  const conWidth = windowWidth - 8;
  const conHeight = windowHeight - 50;

  const itemWidth = conWidth / COL;
  const itemHeight = conHeight / ROW;

  const dragGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_, state) => {
      isGestureActive.value ? state.activate() : state.fail();
    })
    .onStart(e => {
      touchPos.value = { x: e.x, y: e.y };
    })
    .onUpdate(e => {
      touchPos.value = { x: e.x, y: e.y };
    })
    .onEnd(() => {
      touchPos.value = null;
    })
    .onFinalize(() => {
      isGestureActive.value = false;
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(150)
    .onStart(e => {
      isGestureActive.value = true;
      touchPos.value = { x: e.x, y: e.y };
    })
    .onEnd(_event => {
      touchPos.value = null;
    });

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 50 }}>
      <GestureDetector
        gesture={Gesture.Simultaneous(dragGesture, longPressGesture)}>
        <View
          style={[
            {
              width: conWidth,
              height: conHeight,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
            },
          ]}>
          {APP_ICONS.map((icon, index) => (
            <AppItem
              key={index}
              itemWidth={itemWidth}
              itemHeight={itemHeight}
              icon={{ uri: icon }}
              index={index}
              touchPos={touchPos}
            />
          ))}
        </View>
      </GestureDetector>
    </View>
  );
}
