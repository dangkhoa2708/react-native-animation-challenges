import React, { useEffect } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Item } from '.';

const radius = 16;

type CardProps = {
  backgroundColor: string;
  style?: StyleProp<ViewStyle>;
  widthCard: number;
  heightCard: number;
  onExit: (item: Item) => void;
  item: Item;
  index: number;
  fieldColor: string;
};

export default function Card({
  backgroundColor,
  style,
  widthCard,
  heightCard,
  onExit,
  item,
  index,
  fieldColor,
}: CardProps) {
  const positionY = useSharedValue(0);
  const progress = useSharedValue(0);
  const rotate = useSharedValue(0);
  const rotate2 = useSharedValue(0);

  const scale = useSharedValue(1);
  const haveRunExit = useSharedValue(false);

  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const top = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(widthCard + index * 10);
    height.value = withTiming(heightCard);
    top.value = withTiming(index * 10);
  }, [index]);

  useDerivedValue(() => {
    rotate.value = interpolate(
      progress.value,
      [0, 0.2, 0.9],
      [0, 10, 360],
      Extrapolate.CLAMP,
    );

    rotate2.value = interpolate(
      progress.value,
      [0, 0.2, 0.4, 0.9],
      [0, 10, 170, 360],
      Extrapolate.CLAMP,
    );
    scale.value = interpolate(
      progress.value,
      [0, 0.8, 1],
      [1, 0.8, 1],
      Extrapolate.CLAMP,
    );
    // }
  });

  const conAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      top: withSpring(positionY.value, {
        damping: 6,
        mass: 0.2,
        stiffness: 100,
      }),
      transform: [
        {
          rotate: `${Math.floor(rotate.value)}deg`,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      transform: [
        {
          translateY: positionY.value,
        },
        {
          rotate: `${Math.floor(rotate2.value)}deg`,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {}
  >({
    onActive: event => {
      if (event.translationY < 0) {
        positionY.value = event.translationY;
        if (Math.abs(event.translationY) > 10) {
          progress.value = 0.2;
        } else {
          progress.value = 0;
        }

        if (
          Math.abs(event.translationY) > height.value + 80 &&
          haveRunExit.value == false
        ) {
          haveRunExit.value = true;
          runOnJS(onExit)(item);
        }
      }
    },
    onEnd: evt => {
      positionY.value = withTiming(0, {
        duration: 600,
      });

      if (Math.abs(positionY.value) > height.value + 80) {
        progress.value = withTiming(
          1,
          {
            duration: 600,
          },
          () => {
            progress.value = 0;
            haveRunExit.value = false;
          },
        );
      } else {
        progress.value = withTiming(0, { duration: 600 });
        haveRunExit.value = false;
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[style, conAnimatedStyle]}>
        <Animated.View
          style={[
            {
              backgroundColor,
              position: 'absolute',
              borderRadius: radius,
              justifyContent: 'flex-end',
              padding: 16,
            },
            animatedStyle,
          ]}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: fieldColor,
                borderRadius: 25,
              }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <View
                style={{
                  width: 140,
                  backgroundColor: fieldColor,
                  height: 10,
                  borderRadius: radius,
                }}
              />
              <View
                style={{
                  marginTop: 15,
                  width: 60,
                  backgroundColor: fieldColor,
                  height: 10,
                  borderRadius: radius,
                }}
              />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            {
              backgroundColor,
              opacity: 0.2,
              borderRadius: radius,
            },
            animatedStyle2,
          ]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}
