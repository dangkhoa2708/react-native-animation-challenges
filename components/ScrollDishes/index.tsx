import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import images from '../../common/images';
import Helper from '../../Helper';
import AttributeItem from './AttributeItem';
import RoundImage from './RoundImage';

const { width, height } = Dimensions.get('window');
const lightColor = '#dedede';
const darkLightColor = '#858585';
const darkBackground = '#1d102e';
const squareSize = height * 0.4;
const distanceFromTop =
  height / 2 - squareSize / 2 - Helper.normalize(30, 'height');
let currenIndex = 0;

const data = [
  {
    img: images.imgPizza,
    title: 'Pizza 4P',
    fire: '1 hour',
    ribbon: '40',
    flash: 'Easy',
    compass: 'Safety',
    water: 'Healthy',
    describe:
      'Nulla anim fugiat velit eiusmod aliqua anim exercitation. Fugiat dolor cillum consequat laboris sit consequat labore laborum magna aliqua cillum. Deserunt ad amet mollit proident laborum adipisicing esse. Ipsum reprehenderit duis dolor reprehenderit voluptate aliquip qui excepteur nostrud. Deserunt incididunt enim voluptate Lorem id nisi incididunt minim amet cillum mollit Lorem in irure. Tempor est tempor anim consectetur reprehenderit ad sint tempor. Dolor reprehenderit commodo Lorem est esse enim anim anim veniam irure fugiat.',
  },
  {
    img: images.imgBeef,
    title: 'Beef Steak',
    fire: '3 hours 30m',
    ribbon: '20',
    flash: 'Hard',
    compass: 'No Safety',
    water: 'Fat',
    describe:
      'Anim dolor commodo deserunt irure laboris proident occaecat esse aliquip mollit duis esse eu. Officia tempor minim mollit veniam nostrud velit officia culpa id sit consectetur sunt. Commodo tempor sunt fugiat labore officia irure mollit cillum aute sunt irure minim consectetur consectetur. Ad cillum reprehenderit id elit. Ipsum sunt fugiat voluptate eu enim in labore aliquip nostrud qui ipsum cillum eiusmod dolore. Cupidatat velit reprehenderit ullamco cillum fugiat id velit quis. Incididunt consequat esse in et ipsum commodo reprehenderit nulla pariatur nulla.',
  },
  {
    img: images.imgSpaghetti,
    title: 'Spaghetti something',
    fire: '2 hours',
    ribbon: '90',
    flash: 'Difficult',
    compass: 'Dangerous',
    water: 'Thin',
    describe:
      'Irure irure qui commodo esse in nostrud ipsum aute. Ad aliqua proident ad non. Quis officia aute velit quis labore ad sunt cillum. Commodo eu incididunt adipisicing ipsum non incididunt adipisicing enim.',
  },
];

export default function ScrollDishes() {
  const [fakeData, setFakeData] = useState(data[0]);
  const transformY = useSharedValue(0);

  const recordBeginY = useSharedValue(0);
  const skipFinal = useSharedValue(false);
  const [theme, setTheme] = useState('dark');
  const isLight = useSharedValue(0);

  const animatedRotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${-transformY.value}deg`,
        },
      ],
    };
  });

  const changeTheme = () => {
    setTheme(theme == 'light' ? 'dark' : 'light');
  };

  const goToNext = () => {
    currenIndex = currenIndex + 1;
    if (currenIndex > 2) {
      currenIndex = 0;
    }
    setFakeData(data[currenIndex]);
  };
  const goBack = () => {
    currenIndex = currenIndex - 1;
    if (currenIndex < 0) {
      currenIndex = 2;
    }
    setFakeData(data[currenIndex]);
  };

  const animateBackgroundStyle = useAnimatedStyle(() => {
    let color = '';
    if (isLight.value == 0) {
      color = darkBackground;
    }
    if (isLight.value == 1) {
      color = 'white';
    }
    return {
      backgroundColor: color,
    };
  });
  const animateBackgroundOverlayStyle = useAnimatedStyle(() => {
    let color = '';
    if (isLight.value == 0) {
      color = 'white';
    }
    if (isLight.value == 1) {
      color = darkBackground;
    }
    return {
      backgroundColor: color,
    };
  });

  const animatedOverlayStyle = useAnimatedStyle(() => {
    const valueTop = interpolate(
      Math.abs(transformY.value),
      [0, 360],
      [height, 0],
      Extrapolate.CLAMP,
    );

    return {
      top: transformY.value > 0 ? -valueTop : valueTop,
    };
  });

  const animateTitleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(transformY.value),
      [0, 180, 360],
      [1, 0, 1],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      Math.abs(transformY.value),
      [0, 180, 360],
      [0, 100, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacity,
      transform: [
        { translateY: transformY.value > 0 ? translateY : -translateY },
      ],
    };
  });

  const imageStyle = {
    tintColor: theme == 'light' ? darkBackground : lightColor,
  };
  const textStyle = { color: theme == 'light' ? darkBackground : lightColor };
  const paragraphStyle = {
    color: theme == 'light' ? darkBackground : darkLightColor,
  };
  const borderColor = {
    borderColor: theme == 'light' ? darkBackground : 'white',
  };
  const gesture = Gesture.Pan()

    .onBegin(e => {
      recordBeginY.value = e.absoluteY;
    })
    .onUpdate(e => {
      //   console.log(e.translationY);
      transformY.value = e.translationY;
    })
    .onTouchesMove((e, manager) => {
      const movedGap = e.allTouches[0].absoluteY - recordBeginY.value;

      if (Math.abs(movedGap) > height * 0.1) {
        skipFinal.value = true;
        transformY.value = withSpring(transformY.value < 0 ? -360 : 360, {
          damping: 15,
        });
        if (movedGap < 0) {
          runOnJS(goToNext)();
        } else {
          runOnJS(goBack)();
        }
        runOnJS(changeTheme)();
        manager.end();
      }
    })
    .onFinalize(e => {
      if (skipFinal.value) {
        skipFinal.value = false;
        isLight.value = withTiming(
          isLight.value == 0 ? 1 : 0,
          {
            duration: 800,
          },
          () => {
            transformY.value = 0;
          },
        );
      } else {
        if (Math.abs(transformY.value) < height * 0.1) {
          transformY.value = withSpring(0);
        }
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            flex: 1,
            paddingTop: height * 0.15,
            paddingHorizontal: Helper.normalize(20),
          },
          animateBackgroundStyle,
        ]}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              height: height,
              left: 0,
              right: 0,
            },
            animatedOverlayStyle,
            animateBackgroundOverlayStyle,
          ]}
        />
        <Animated.Text
          style={[
            styles.title,
            { color: theme == 'light' ? darkBackground : 'white' },
            animateTitleStyle,
          ]}>
          {fakeData.title}
        </Animated.Text>
        <View
          style={{
            height: height * 0.3,
            justifyContent: 'space-between',
            marginTop:
              distanceFromTop - height * 0.15 + Helper.normalize(20, 'height'),
          }}>
          <AttributeItem
            imageStyle={imageStyle}
            textStyle={textStyle}
            icon={images.iconFire}
            text={fakeData.fire}
          />
          <AttributeItem
            imageStyle={imageStyle}
            textStyle={textStyle}
            icon={images.iconRibbon}
            text={fakeData.ribbon}
          />
          <AttributeItem
            imageStyle={imageStyle}
            textStyle={textStyle}
            icon={images.iconCompass}
            text={fakeData.compass}
          />
          <AttributeItem
            imageStyle={imageStyle}
            textStyle={textStyle}
            icon={images.iconFlash}
            text={fakeData.flash}
          />
          <AttributeItem
            imageStyle={imageStyle}
            textStyle={textStyle}
            icon={images.iconWater}
            text={fakeData.water}
          />
        </View>
        <Animated.Text
          numberOfLines={6}
          style={[styles.paragraph, paragraphStyle, animateTitleStyle]}>
          {fakeData.describe}
        </Animated.Text>

        <RoundImage
          size={squareSize}
          style={[styles.img, borderColor]}
          source={fakeData.img}
          animateStyle={animatedRotateStyle}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: Helper.normalize(28, 'height'),
    fontWeight: '800',
  },
  paragraph: {
    marginTop: Helper.normalize(100, 'height'),
  },
  img: {
    position: 'absolute',
    right: -squareSize / 2,
    top: distanceFromTop,
  },
});
