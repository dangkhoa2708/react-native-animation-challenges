import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { COL } from '.';

const RADIUS = 130;

type AppItemProps = {
  itemWidth: number;
  itemHeight: number;
  icon: ImageSourcePropType;
  index: number;
  touchPos: Animated.SharedValue<{
    x: number;
    y: number;
  } | null>;
};

export default function AppItem({
  itemWidth,
  itemHeight,
  icon,
  index,
  touchPos,
}: AppItemProps) {
  const row = Math.trunc(index / COL);
  const col = index % COL;
  const posX = col * itemWidth + itemWidth / 2;
  const posY = row * itemHeight + itemHeight / 2;

  const viewStyle = useAnimatedStyle(() => {
    // Getting distance between two points using equation, d=√((x2 – x1)² + (y2 – y1)²)
    const distance = touchPos.value
      ? Math.sqrt(
          Math.pow(touchPos.value.x - posX, 2) +
            Math.pow(touchPos.value.y - posY, 2),
        )
      : 0;

    let translateX = 0,
      translateY = 0;
    if (touchPos.value) {
      // Here 'touchPos.value.(x/y) - pos(X/Y)' will translate a particular item to the touch point, then multiplying
      // that value with this median (correct name?) will distribute items to a distance, basically forming a Circle.
      const median = (distance - RADIUS) / RADIUS;

      // translateX = (distance / RADIUS) * (touchPos.value.x - posX) * median;
      // translateY = (distance / RADIUS) * (touchPos.value.y - posY) * median;
      translateX = (touchPos.value.x - posX) * median;
      translateY = (touchPos.value.y - posY) * median;

      // Clamp the translate value to the touch point if it is getting past that.
      if (Math.abs(translateX) > Math.abs(touchPos.value.x - posX)) {
        translateX = touchPos.value.x - posX;
      }
      if (Math.abs(translateY) > Math.abs(touchPos.value.y - posY)) {
        translateY = touchPos.value.y - posY;
      }
    }

    return {
      zIndex: distance <= RADIUS ? 99 : 9, // just so scaled down items don't show above bigger ones
      transform: [
        { translateX: withSpring(translateX, { damping: 20, mass: 0.8 }) },
        { translateY: withSpring(translateY, { damping: 20, mass: 0.8 }) },
        // Currently setting the scaling hard coded (3, 2, 1) and it seems to be working fine for different radius.
        // Make it dynamic?
        {
          scale: withSpring(
            interpolate(
              distance,
              [0, 0.01, RADIUS / 3, RADIUS / 2, RADIUS],
              [1, 3, 2, 1, 0.15],
              {
                extrapolateLeft: Extrapolate.CLAMP,
                extrapolateRight: Extrapolate.CLAMP,
              },
            ),
            { damping: 20, mass: 0.8 },
          ),
        },
      ],
    };
  }, []);

  return (
    <Animated.View
      style={[{ width: itemWidth, height: itemHeight }, viewStyle]}>
      <Image
        style={{
          width: itemWidth - 16,
          height: itemHeight - 16,
          borderRadius: 10,
          margin: 6,
        }}
        source={icon}
      />
    </Animated.View>
  );
}
