import {
  Dimensions,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { assets, EnumType, GAP_HEIGHT, SIZE_PIZZA } from './config';
import IngredientSelection from './IngredientSelection';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import IngredientList from './IngredientList';
import Box from './Box';

export type IngredientIndexState = {
  [EnumType.BROCCOLI]: 0;
  [EnumType.MUSHROOM]: 0;
  [EnumType.BASIL]: 0;
  [EnumType.SAUSAGE]: 0;
};

export default function PizzaChallenge() {
  const isSelected = useSharedValue(false);
  const progressCart = useSharedValue(0);
  const [pizzaState, setPizzaState] = useState<IngredientIndexState>({
    [EnumType.BROCCOLI]: 0,
    [EnumType.MUSHROOM]: 0,
    [EnumType.BASIL]: 0,
    [EnumType.SAUSAGE]: 0,
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isSelected.value ? 1.1 : 1 }],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progressCart.value,
      [0, 0.8],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      progressCart.value,
      [0.2, 1],
      [0, -130],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });
  return (
    <View style={styles.container}>
      <Box
        onPressBuy={() => {
          progressCart.value = withTiming(1, {
            duration: 1200,
          });
        }}
        progress={progressCart}
      />
      <Animated.View
        style={[
          stylePizzaCon,
          {
            marginTop: 100,
          },
          animatedContainerStyle,
        ]}>
        <Animated.Image
          style={[styles.image, animatedStyle]}
          source={assets.plate}
        />
        <Animated.Image
          style={[styles.image, animatedStyle]}
          source={assets.bread[0]}
        />
        <View style={[stylePizzaCon, { transform: [{ scale: 0.8 }] }]}>
          <IngredientList
            radius={SIZE_PIZZA / 2}
            type={EnumType.SAUSAGE}
            index={pizzaState[EnumType.SAUSAGE]}
          />
          <IngredientList
            radius={SIZE_PIZZA / 2}
            type={EnumType.BROCCOLI}
            index={pizzaState[EnumType.BROCCOLI]}
          />
          <IngredientList
            radius={SIZE_PIZZA / 2}
            type={EnumType.MUSHROOM}
            index={pizzaState[EnumType.MUSHROOM]}
          />
          <IngredientList
            radius={SIZE_PIZZA / 2}
            type={EnumType.BASIL}
            index={pizzaState[EnumType.BASIL]}
          />
        </View>
      </Animated.View>

      <View style={{ height: GAP_HEIGHT, marginTop: SIZE_PIZZA }} />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          marginHorizontal: 30,
        }}>
        <IngredientSelection
          type={EnumType.SAUSAGE}
          isSelected={isSelected}
          style={{ marginRight: 20 }}
          source={assets.sausage[1]}
          setPizzaState={setPizzaState}
        />
        <IngredientSelection
          type={EnumType.BASIL}
          isSelected={isSelected}
          style={{ marginRight: 20 }}
          source={assets.basil[1]}
          setPizzaState={setPizzaState}
        />
        <IngredientSelection
          type={EnumType.MUSHROOM}
          isSelected={isSelected}
          style={{ marginRight: 20 }}
          source={assets.mushroom[4]}
          setPizzaState={setPizzaState}
        />
        <IngredientSelection
          type={EnumType.BROCCOLI}
          isSelected={isSelected}
          style={{ marginRight: 20 }}
          source={assets.broccoli[0]}
          setPizzaState={setPizzaState}
        />
      </View>
    </View>
  );
}

const stylePizzaCon: StyleProp<ImageStyle> = {
  position: 'absolute',
  // top: 80,
  width: SIZE_PIZZA,
  height: SIZE_PIZZA,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  image: {
    ...stylePizzaCon,
    resizeMode: 'contain',
  },
});
