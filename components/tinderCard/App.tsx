import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  useDerivedValue,
  withTiming,
  useAnimatedReaction,
  useAnimatedProps,
  runOnJS,
} from 'react-native-reanimated';
import { Extrapolate } from 'react-native-reanimated';
import StatusText from './StatusText';
import images from '../../common/images';
import ButtonComp from './ButtonComp';

export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number,
) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

const { width, height } = Dimensions.get('screen');

const AnimatedStatusText = Animated.createAnimatedComponent(StatusText);
const AnimatedBackgrounImg = Animated.createAnimatedComponent(ImageBackground);

const fakeData = [
  {
    name: 'Strength',
    url: 'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
  },
  {
    name: 'Tower',
    url: 'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
  },
  {
    name: 'Chariot',
    url: 'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
  },

  {
    name: 'Lovers',
    url: 'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
  },

  {
    name: 'High Priestess',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  },
];

const outWidth = width + 50;

const App = () => {
  const [data, setData] = useState(fakeData);

  const colorGradientThumb = [
    'rgba(40,40,40,0.1)',
    'rgba(40,40,40,0.1)',
    'rgba(40,40,40,0.8)',
    'rgba(40,40,40,1)',
  ];

  const renderFakeHobbies = () => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
        <View style={styles.hobbiCon}>
          <Text style={styles.hobbiText}>Tâm linh</Text>
        </View>
        <View style={styles.hobbiCon}>
          <Text style={styles.hobbiText}>Vũ trụ</Text>
        </View>
        <View style={styles.hobbiCon}>
          <Text style={styles.hobbiText}>Trần Dần</Text>
        </View>
      </View>
    );
  };

  const renderFakeBtn = (activeCode: string) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <ButtonComp
          active={activeCode == 'undo'}
          color="#e6e600"
          icon={images.iconUndo}
        />
        <ButtonComp
          active={activeCode == 'no'}
          color="#ff4d4d"
          icon={images.iconClose}
        />
        <ButtonComp
          active={activeCode == 'superLike'}
          color="#3399ff"
          icon={images.iconStar}
        />
        <ButtonComp
          active={activeCode == 'like'}
          color="#00ffcc"
          icon={images.iconHeart}
        />
        <ButtonComp
          active={activeCode == 'fast'}
          color="#d11aff"
          icon={images.iconThunder}
        />
      </View>
    );
  };

  const renderCards = (array: Array<any>) => {
    return array.map((e, index) => {
      const translateX = useSharedValue(0);
      const translateY = useSharedValue(0);
      const rotate = useSharedValue(0);
      const [statusText, setStatusText] = useState('NOPE');
      const [activeCode, setActiveCode] = useState('none');

      const opacity = useDerivedValue(() => {
        return interpolate(
          Math.abs(rotate.value),
          [0, 10],
          [0, 1],
          Extrapolate.CLAMP,
        );
      });

      const additionalStyle = useAnimatedStyle(() => {
        const style: StyleProp<TextStyle> = {
          position: 'absolute',
          top: 20,
        };

        if (rotate.value < 0) {
          style.left = 5;
          style.borderColor = 'green';
          style.transform = [
            {
              rotate: '-20deg',
            },
          ];
        } else {
          style.left = 350 - 125;
          style.borderColor = 'red';

          style.transform = [
            {
              rotate: '20deg',
            },
          ];
        }

        return style;
      });

      const style = useAnimatedStyle(() => {
        return {
          transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotate: `${rotate.value}deg` },
          ],
        };
      });

      const styleText = useAnimatedStyle(() => {
        return {
          opacity: opacity.value,
        };
      });

      const updateText = (text: string) => {
        setStatusText(text);
      };
      const deleteItem = (index: number) => {
        const newArra = [...data];
        newArra.splice(index, 1);
        setData([...data]);
      };

      const setCode = (text: string) => {
        setActiveCode(text);
      };
      const onGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        {
          offsetX: number;
          offsetY: number;
        }
      >({
        onStart: (_, ctx) => {
          ctx.offsetX = translateX.value;
          ctx.offsetY = translateY.value;
        },
        onActive: (event, ctx) => {
          translateX.value = ctx.offsetX + event.translationX;
          translateY.value = ctx.offsetY + event.translationY;
          const absX = Math.abs(event.translationX);
          if (absX < 50) {
            rotate.value = -event.translationX / 5;
          }

          if (absX < 2 && event.translationY < -5) {
            runOnJS(setCode)('superLike');
          }
          if (absX > 2) {
            if (rotate.value < 0) {
              runOnJS(updateText)('LIKE');
              runOnJS(setCode)('like');
            } else {
              runOnJS(updateText)('NOPE');
              runOnJS(setCode)('no');
            }
          }
        },
        onEnd: ({ translationX }) => {
          if (Math.abs(translationX) < 100) {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            rotate.value = withTiming(0);
            runOnJS(setCode)('none');
          } else {
            translateX.value = withSpring(
              translationX < 0 ? -outWidth : outWidth,
            );
            runOnJS(deleteItem)(index);
            runOnJS(setCode)('none');
          }
        },
      });
      return (
        <PanGestureHandler key={e.name} onGestureEvent={onGestureEvent}>
          <AnimatedBackgrounImg
            source={{
              uri: e.url,
            }}
            style={[
              {
                width: 350,
                height: 600,
                backgroundColor: 'black',
                position: 'absolute',
              },
              style,
            ]}>
            <LinearGradient
              colors={colorGradientThumb}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingHorizontal: 15,
                paddingBottom: 20,
              }}>
              <AnimatedStatusText
                style={[styleText, additionalStyle]}
                text={statusText}
              />
              <Text style={styles.text}>{`${e.name}, 25`}</Text>
              {renderFakeHobbies()}
              {renderFakeBtn(activeCode)}
            </LinearGradient>
          </AnimatedBackgrounImg>
        </PanGestureHandler>
      );
    });
  };

  return (
    <SafeAreaView
      style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {renderCards(data)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
    letterSpacing: 3,
  },
  hobbiCon: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: '#999999',
    borderRadius: 15,
    marginRight: 10,
  },
  hobbiText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
});

export default App;
