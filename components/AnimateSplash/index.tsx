import MaskedView from '@react-native-community/masked-view';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import { Extrapolate } from 'react-native-reanimated';
import images from '../../common/images';

const DURATION = 1500;
const dataColors = [
  {
    color: '#477b72',
  },
  {
    color: '#354e93',
  },
  {
    color: '#d9681a',
  },
];
const dataImages = [
  {
    img: images.imgFirst,
  },
  {
    img: images.imgSecond,
  },
  {
    img: images.imgThird,
  },
];

let currentNextIndex = 1;
let flag = 0;
const { width, height } = Dimensions.get('window');
export default function AnimateSplash() {
  const [screenColor, setScreenColor] = useState(dataColors[0]);
  const [overlayColor, setOverLayColor] = useState(
    dataColors[currentNextIndex],
  );

  const [screenImg, setScreenImg] = useState(dataImages[0]);
  const [overlayImg, setOverlayImg] = useState(dataImages[currentNextIndex]);
  const [animating, setAnimating] = useState(false);
  const progress = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    currentNextIndex = 1;
    flag = 0;
    progress.addListener(progressAni => {
      if (flag == 0) {
        if (progressAni.value >= 1) {
          flag += 1;

          setScreenColor(dataColors[currentNextIndex]);
          currentNextIndex = currentNextIndex + 1;
          if (currentNextIndex == dataColors.length) {
            currentNextIndex = 0;
          }
          setOverLayColor(dataColors[currentNextIndex]);
          return;
        }
      }
    });
  }, []);

  const startAnimation = () => {
    setAnimating(true);
    Animated.timing(progress, {
      toValue: 1.2,
      duration: DURATION,
      useNativeDriver: false,
    }).start(() => {
      setScreenImg({ ...overlayImg });
      setTimeout(() => {
        progress.setValue(0);
        setAnimating(false);
        setOverlayImg(dataImages[currentNextIndex]);
      }, 300);

      flag = 0;
    });
  };

  const colorBackground = progress.interpolate({
    inputRange: [0, 0.5, 0.5001, 1, 1.001, 1.2],
    outputRange: [
      screenColor.color,
      screenColor.color,
      overlayColor.color,
      overlayColor.color,
      screenColor.color,

      screenColor.color,
    ],
  });
  const buttonColor = progress.interpolate({
    inputRange: [0, 0.5, 0.5001, 1, 1.001, 1.2],
    outputRange: [
      overlayColor.color,
      overlayColor.color,
      screenColor.color,
      screenColor.color,
      overlayColor.color,
      overlayColor.color,
    ],
  });

  const rotateY = progress.interpolate({
    inputRange: [0, 0.5, 1, 1.2],
    outputRange: ['0deg', '-90deg', '-180deg', '0deg'],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 6, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const leftScreen = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -width, -width],
    extrapolate: Extrapolate.CLAMP,
  });

  const leftScreenOverlay = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [width, width, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateX = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0%', '50%', '0%'],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.0001, 1.19, 1.2],
    outputRange: [1, 0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <Animated.View style={{ flex: 1, backgroundColor: colorBackground }} />

      <Animated.Image
        style={{
          resizeMode: 'cover',

          alignSelf: 'center',
          position: 'absolute',
          width: width,
          height: height * 0.5,

          top: height * 0.2,
          left: leftScreenOverlay,
        }}
        source={overlayImg.img}
      />
      <Animated.Image
        style={{
          resizeMode: 'cover',
          alignSelf: 'center',
          position: 'absolute',
          width: width,
          top: height * 0.2,
          height: height * 0.5,
          zIndex: 100,

          left: leftScreen,
        }}
        source={screenImg.img}
      />

      <MaskedView
        style={StyleSheet.absoluteFillObject}
        maskElement={
          <Animated.View
            style={[
              {
                backgroundColor: 'black',
                width: 80,
                height: 80,
                borderRadius: 40,
                position: 'absolute',
                alignSelf: 'center',
                bottom: 80,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [
                  { perspective: 200 },
                  { rotateY },
                  { scale },
                  { translateX },
                ],
              },
            ]}>
            <Image
              source={images.iconArrowDown}
              resizeMode="contain"
              style={{
                transform: [{ rotate: '-90deg' }],
                tintColor: 'black',
              }}
            />
          </Animated.View>
        }>
        <Animated.View style={{ flex: 1, backgroundColor: buttonColor }} />
      </MaskedView>

      <View
        style={[
          {
            width: 80,
            height: 80,
            borderRadius: 40,
            position: 'absolute',
            bottom: 80,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <TouchableOpacity disabled={animating} onPress={startAnimation}>
          <Animated.Image
            source={images.iconArrowDown}
            resizeMode="contain"
            style={{
              transform: [{ rotate: '-90deg' }],
              tintColor: 'black',
              opacity,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
