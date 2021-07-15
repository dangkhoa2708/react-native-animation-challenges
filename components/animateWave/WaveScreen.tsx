import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import images from '../../common/images';
import AnimateWave from './AnimateWave';

let tempPercent = 0;
let hasChangedTarget = false;

const targetWater = 2;

export default function WaterScreen() {
  const [percentage] = useState(new Animated.Value(0));
  const [targetWaterConsump, setTargetWaterConsump] = useState(targetWater);
  const [consumption, setConsumption] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return !(gestureState.dx === 0 && gestureState.dy === 0);
    },
    onPanResponderTerminationRequest: (evt, gestureState) => false,
    onPanResponderMove: (evt, gestureState) => {
      let newY = gestureState.dy;
      const absNewY = Math.abs(newY);

      const waveConHeight = 160;
      if (newY <= 0 && absNewY <= waveConHeight && tempPercent <= 100) {
        const addedValue = Math.round((absNewY * 100) / waveConHeight);
        percentage.setValue(tempPercent + addedValue);
      }

      if (newY >= 0 && tempPercent > 0 && absNewY <= waveConHeight) {
        percentage.setValue(
          tempPercent - Math.round((absNewY * 100) / waveConHeight),
        );
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      //@ts-ignore
      if (percentage._value >= 100) {
        tempPercent = 100;
        //@ts-ignore
      } else if (percentage._value <= 0) {
        tempPercent = 0;
      } else {
        //@ts-ignore

        tempPercent = percentage._value;
      }
      setConsumption(
        Number(((tempPercent * targetWaterConsump) / 100).toFixed(2)),
      );
    },
  });

  const color = percentage.interpolate({
    inputRange: [0, 44, 45],
    outputRange: ['rgba(32,93,241, 1)', 'rgba(32,93,241, 1)', 'white'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
      }}>
      <Animated.View style={styles.waveCon} {...panResponder.panHandlers}>
        <AnimateWave
          surfaceHeight={220}
          surfaceWidth={100}
          amplitude={6}
          percentage={percentage}
        />
        <Animated.View style={styles.waterInfoCon}>
          <Animated.Image
            resizeMode="contain"
            style={[styles.arrowIcon, { tintColor: color }]}
            source={images.iconArrowDown}
          />
          <Animated.Text style={[styles.waterAmount, { color: color }]}>
            <Text style={{ fontWeight: '500' }}>
              {(consumption * 1000).toFixed(0)}
            </Text>
            {`/${targetWaterConsump * 1000}ml`}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  waveCon: {
    height: 220,
    width: 100,
    borderRadius: 40,
    overflow: 'hidden',
    marginTop: 80,
  },
  waterAmount: {
    marginTop: 10,
    fontSize: 14,
  },
  waterInfoCon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    transform: [{ rotate: '-180deg' }],
    width: 14,
    height: 14,
  },
});
