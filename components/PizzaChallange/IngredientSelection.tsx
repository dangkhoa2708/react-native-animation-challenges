import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  event,
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { IngredientIndexState } from '.';
import { EnumType, GAP_HEIGHT, SIZE_PIZZA } from './config';

type IngredientSelectionProps = {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  isSelected: Animated.SharedValue<boolean>;
  type: EnumType;
  setPizzaState: React.Dispatch<React.SetStateAction<IngredientIndexState>>;
};

const { width } = Dimensions.get('screen');

export default function IngredientSelection({
  source,
  style,
  isSelected,
  type,
  setPizzaState,
}: IngredientSelectionProps) {
  const aTranslateX = useSharedValue(0);
  const aTranslateY = useSharedValue(0);
  const aOpacity = useSharedValue(1);

  const onChangeSelection = () => {
    setPizzaState((state: IngredientIndexState) => {
      const maxValue = Math.max(...Object.values(state));
      return {
        ...state,
        [type]: state[type] == 0 ? maxValue + 1 : 0,
      };
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: aTranslateX.value },
        { translateY: aTranslateY.value },
      ],
      opacity: aOpacity.value,
    };
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {}
  >({
    onActive: event => {
      aTranslateX.value = event.translationX;
      aTranslateY.value = event.translationY;
      const minRange = (width - SIZE_PIZZA) / 2;
      const maxRange = minRange + SIZE_PIZZA;
      if (
        event.translationY < -GAP_HEIGHT &&
        event.absoluteX > minRange &&
        event.absoluteX < maxRange &&
        event.absoluteY > 80
      ) {
        isSelected.value = true;
      } else {
        isSelected.value = false;
      }
    },
    onEnd: () => {
      if (isSelected.value) {
        runOnJS(onChangeSelection)();
        aOpacity.value = 0;
      }
      aTranslateX.value = withTiming(0);
      aTranslateY.value = withTiming(0, undefined, () => {
        aOpacity.value = 1;
      });
      isSelected.value = false;
    },
  });
  return (
    <TouchableOpacity
      onPress={onChangeSelection}
      style={[styles.container, style]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.Image style={[styles.img, animatedStyle]} source={source} />
      </PanGestureHandler>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#ffe6cc',
    borderColor: '#d9d9d9',
    borderWidth: 1,
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
