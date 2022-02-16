import React from 'react';
import { ReactElement } from 'react';
import { Dimensions } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  event,
  runOnJS,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { runOnUI } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import {
  arrangeOffsets,
  byOrder,
  GAP,
  isInLines,
  NUMBER_OF_LINES,
  remove,
  reOrderItems,
  WORD_HEIGHT,
} from './Layout';
import Placeholder from './PlaceHolder';
import { OffSetItem } from './WordContainer';

type SortableConProps = {
  children: ReactElement;
  offsets: Array<OffSetItem>;
  index: number;
};

const { width } = Dimensions.get('screen');

export default function SortableCon({
  children,
  offsets,
  index,
}: SortableConProps) {
  const offsetItem = offsets[index];

  const gestureActive = useSharedValue(false);

  const isSorted = useDerivedValue(() => {
    return offsetItem.order.value !== -1;
  });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const aTranslateX = useDerivedValue(() => {
    if (gestureActive.value) {
      return translateX.value;
    }

    return withSpring(
      isSorted.value ? offsetItem.x.value : offsetItem.originalX.value,
    );
  });

  const aTranslateY = useDerivedValue(() => {
    if (gestureActive.value) {
      return translateY.value;
    }

    return withSpring(
      isSorted.value ? offsetItem.y.value : offsetItem.originalY.value + GAP,
    );
  });

  const styleCon = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: WORD_HEIGHT,
      width: offsetItem.width.value,
      zIndex: gestureActive.value ? 100 : 0,
      transform: [
        { translateX: aTranslateX.value },
        { translateY: aTranslateY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetX: number; offsetY: number; isSorted: boolean }
  >({
    onStart: (_, ctx) => {
      if (isSorted.value) {
        translateX.value = offsetItem.x.value;
        translateY.value = offsetItem.y.value;
      } else {
        translateX.value = offsetItem.originalX.value;
        translateY.value = offsetItem.originalY.value + GAP;
      }
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
      ctx.isSorted = isSorted.value;

      gestureActive.value = true;
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.offsetX;
      translateY.value = event.translationY + ctx.offsetY;

      const orderedOffsets = offsets.filter(isInLines).sort(byOrder);

      const itemForSwap = orderedOffsets.find(
        o =>
          o.x.value + o.width.value / 2 > translateX.value &&
          translateY.value >= o.y.value &&
          translateY.value <= o.y.value + WORD_HEIGHT,
      );
      if (itemForSwap && offsetItem.order.value != itemForSwap.order.value) {
        ctx.isSorted = true;
        reOrderItems(orderedOffsets, offsetItem, itemForSwap.order.value);
        arrangeOffsets(offsets);
      }
    },
    onEnd: (event, ctx) => {
      const LINES_HEIGHT = (NUMBER_OF_LINES - 1) * WORD_HEIGHT;
      const gap = ctx.offsetY - LINES_HEIGHT;

      if (
        !ctx.isSorted &&
        event.translationY < 0 &&
        Math.abs(event.translationY) > gap
      ) {
        // enter answer field
        offsetItem.order.value = offsets.filter(isInLines).length;
      } else if (ctx.isSorted) {
        if (event.translationY > 0 && translateY.value - LINES_HEIGHT > 0) {
          // get out of answer field
          remove(offsets, index);
        } else {
        }
      }
      gestureActive.value = false;
      arrangeOffsets(offsets);
    },
  });
  return (
    <>
      <Placeholder offset={offsets[index]} />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styleCon}>{children}</Animated.View>
      </PanGestureHandler>
    </>
  );
}
