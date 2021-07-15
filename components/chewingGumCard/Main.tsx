import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { StyleProp } from 'react-native';
import { View } from 'react-native';
import Animated, {
  interpolate,
  runOnUI,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';
import images from '../../common/images';

const gapHeight = 75;
const color = '#4747d1';

const renderBigCol = (
  toggle: Animated.SharedValue<number>,
  toggleWidth: Animated.SharedValue<number>,
) => {
  const styleHeight = useAnimatedStyle(() => {
    const valueHeight = interpolate(toggle.value, [0, 1], [0, gapHeight]);
    return {
      height: valueHeight,
    };
  });
  const styleWidth = useAnimatedStyle(() => {
    const valueWidth = interpolate(toggleWidth.value, [0, 1], [14, 60]);
    return {
      width: valueWidth,
    };
  });
  const styleWidth2 = useAnimatedStyle(() => {
    const valueWidth = interpolate(toggleWidth.value, [0, 1], [14, 60]);
    return {
      width: valueWidth,
    };
  });
  return (
    <Animated.View style={{ flexDirection: 'row' }}>
      <Animated.View style={[styles.bigCol, { marginLeft: 0 }, styleHeight]} />
      <Animated.View
        style={[
          styles.bigCol,
          {
            borderTopRightRadius: 80,
            borderBottomRightRadius: 80,
            position: 'absolute',
            backgroundColor: 'white',
          },
          styleWidth,
        ]}
      />
      <Animated.View
        style={[
          styles.bigCol,
          {
            borderTopLeftRadius: 80,
            borderBottomLeftRadius: 80,
            position: 'absolute',
            backgroundColor: 'white',
            right: -5,
          },
          styleWidth2,
        ]}
      />
    </Animated.View>
  );
};

const renderSmallCol = (
  toggle: Animated.SharedValue<number>,
  toggleWidth: Animated.SharedValue<number>,
  style: StyleProp<ViewStyle> = {},
) => {
  const styleHeight = useAnimatedStyle(() => {
    const valueHeight = interpolate(toggle.value, [0, 1], [0, gapHeight]);
    return {
      height: valueHeight,
    };
  });
  const styleWidth = useAnimatedStyle(() => {
    const valueWidth = interpolate(toggleWidth.value, [0, 1], [10, 50]);
    return {
      width: valueWidth,
    };
  });
  const styleWidth2 = useAnimatedStyle(() => {
    const valueWidth = interpolate(toggleWidth.value, [0, 1], [10, 50]);
    return {
      width: valueWidth,
    };
  });
  return (
    <Animated.View style={[{ flexDirection: 'row' }, style]}>
      <Animated.View
        style={[styles.smallCol, { marginLeft: 0 }, styleHeight]}
      />
      <Animated.View
        style={[
          styles.bigCol,
          {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            position: 'absolute',
            backgroundColor: 'white',
            left: 0,
          },
          styleWidth,
        ]}
      />
      <Animated.View
        style={[
          styles.bigCol,
          {
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            position: 'absolute',
            backgroundColor: 'white',
            right: -5,
          },
          styleWidth2,
        ]}
      />
    </Animated.View>
  );
};

export default function Main() {
  const toggle = useSharedValue(0);
  const toggleWidth = useSharedValue(0);
  const toggleWidth2 = useSharedValue(0);

  const toggleWidthSmall = useSharedValue(0);

  const styleTop = useAnimatedStyle(() => {
    const valueHeight = interpolate(toggle.value, [0, 1], [110, 200]);
    return {
      top: valueHeight,
    };
  });

  const styleTranslateY = useAnimatedStyle(() => {
    const valueY = interpolate(toggle.value, [0, 1], [0, -30]);
    return {
      transform: [
        {
          translateY: valueY,
        },
      ],
    };
  });

  const styleRotate = useAnimatedStyle(() => {
    const rotate = interpolate(toggle.value, [0, 1], [0, -180]);
    return {
      transform: [
        {
          rotate: `${rotate}deg`,
        },
      ],
    };
  });

  const styleOpacity = useAnimatedStyle(() => {
    return {
      opacity: toggle.value,
    };
  });

  return (
    <View style={styles.firstCon}>
      <Animated.View
        style={[
          {
            alignItems: 'center',
            position: 'absolute',
          },
          styleTop,
        ]}>
        <View style={{ flexDirection: 'row' }}>
          {renderBigCol(toggle, toggleWidth2)}
          {renderSmallCol(toggle, toggleWidthSmall, {
            marginRight: 40,
          })}
          {renderBigCol(toggle, toggleWidth)}

          {renderSmallCol(toggle, toggleWidthSmall)}
          {renderBigCol(toggle, toggleWidth2)}
        </View>
        <View style={[styles.subCon]}>
          <Animated.View style={[{ alignItems: 'center' }, styleOpacity]}>
            <Text
              style={[styles.textStyle, { marginTop: 30, letterSpacing: 0 }]}>
              Bươm bướm
            </Text>
            <Text
              style={[
                styles.smallTextStyle,
                { fontSize: 16, textAlign: 'center', marginTop: 20 },
              ]}>
              {`Bướm: côn trùng có cánh rộng, vòng đời trải qua giai đoạn nhộng.\nHay nứng !`}
            </Text>
          </Animated.View>
        </View>
      </Animated.View>
      <Animated.View style={[styles.container, styleTranslateY]}>
        <Text style={[styles.textStyle, { marginTop: 30 }]}>Butterfly</Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Image style={styles.icon} source={images.iconVolume} />
          <Text style={[styles.smallTextStyle, { marginLeft: 10 }]}>
            ˈbədərˌflī
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            let setValue = 0;
            let timeOut = 700;

            if (toggle.value == 0) {
              setValue = 1;
            } else {
              timeOut = 0;
            }
            toggle.value = withTiming(setValue, {
              duration: 1000,
            });
            setTimeout(() => {
              toggleWidth.value = withTiming(setValue, {
                duration: 700,
              });
              toggleWidth2.value = withTiming(setValue, {
                duration: 1200,
              });
              toggleWidthSmall.value = withTiming(setValue, {
                duration: 700,
              });
            }, timeOut);
          }}
          style={styles.button}>
          <Animated.Image
            resizeMode="contain"
            style={[styles.iconArrow, styleRotate]}
            source={images.iconArrowDown}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  firstCon: {
    flex: 1,
    alignItems: 'center',
    marginTop: 140,
    backgroundColor: 'white',
  },
  container: {
    width: 320,
    height: 230,
    backgroundColor: color,
    borderRadius: 30,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  subCon: {
    width: 320,
    height: 180,
    backgroundColor: color,
    borderRadius: 30,

    paddingHorizontal: 16,
  },
  bigCol: {
    // 60
    width: 50,
    height: gapHeight,
    backgroundColor: color,
  },
  smallCol: {
    // 40
    width: 30,
    height: gapHeight,
    backgroundColor: color,
    marginLeft: 20,
  },
  textStyle: {
    fontWeight: '500',
    fontSize: 36,
    color: 'white',
    letterSpacing: 8,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#bfbfbf',
  },
  smallTextStyle: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 20,
    position: 'absolute',
    bottom: -30,
    shadowOpacity: 0.5,
    shadowColor: 'black',
    shadowRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconArrow: {
    width: 20,
    height: 20,
  },
});
