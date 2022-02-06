import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Coordinate, DataType } from '.';
import images from '../../common/images';
import Helper from '../../Helper';
import Header from './Header';
import ShoeCard from './ShoeCard';
import ShoeSelection from './ShoeSelection';
import SizeComp from './SizeComp';

type ModalScreenProps = {
  visible: boolean;
  coordinate: Coordinate;
  selectedItem: DataType;
  size: number;
  onClose: () => void;
};

const { height } = Dimensions.get('window');

const fakeShoes = [
  { source: images.imgGreenShoe },
  { source: images.imgYellowShoe },
  { source: images.imgRedShoe },
];

const fakeSize = [
  { size: '6 UK', isOutOfStock: false, isSelected: false },
  { size: '7 UK', isOutOfStock: false, isSelected: false },
  { size: '8 UK', isOutOfStock: false, isSelected: false },
  { size: '9 UK', isOutOfStock: false, isSelected: true },
  { size: '10 UK', isOutOfStock: false, isSelected: false },
  { size: '11 UK', isOutOfStock: true, isSelected: false },
  { size: '12 UK', isOutOfStock: false, isSelected: false },
  { size: '13 UK', isOutOfStock: false, isSelected: false },
  { size: '14 UK', isOutOfStock: true, isSelected: false },
];

const renderSize = () => {
  return fakeSize.map((e, index) => {
    const isLastItem = index == fakeSize.length - 1;
    return (
      <SizeComp
        style={{
          marginRight: isLastItem ? 0 : Helper.normalize(10),
          marginTop: Helper.normalize(14),
        }}
        key={index}
        size={e.size}
        isOutOfStock={e.isOutOfStock}
        isSelected={e.isSelected}
      />
    );
  });
};

const renderShoes = () => {
  return fakeShoes.map((e, index) => {
    return (
      <ShoeSelection
        style={{ marginRight: Helper.normalize(8) }}
        key={index}
        isActive={index == 0}
        source={e.source}
      />
    );
  });
};

export default function ModalScreen({
  visible,
  coordinate,
  selectedItem,
  size,
  onClose,
}: ModalScreenProps) {
  useEffect(() => {
    if (coordinate.x != 0 && progress.value == 0) {
      progress.value = withTiming(1, {
        duration: 1000,
      });
    }
  }, [coordinate]);

  const progress = useSharedValue(0);
  const animatedOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.2, 0.7], [0, 0, 1]);
    const translateY = interpolate(
      progress.value,
      [0, 0.8],
      [180, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const onPress = () => {
    progress.value = withTiming(
      0,
      {
        duration: 1000,
      },
      () => {
        runOnJS(onClose)();
      },
    );
  };

  const animatedBackTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.8, 1], [0, 0, 1]);

    return {
      opacity,
    };
  });
  return (
    <Modal transparent visible={visible}>
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.contentCon, animatedOpacityStyle]}>
          <Header
            style={{ paddingHorizontal: 0 }}
            title={selectedItem.name}
            rightText={selectedItem.price}
          />
          <Text numberOfLines={3} style={styles.description}>
            Consectetur est deserunt adipisicing adipisicing. Enim deserunt
            laboris enim ex qui labore adipisicing in tempor magna ea esse
            nostrud duis. Minim nulla qui excepteur proident quis cillum. Aute
            excepteur ullamco ullamco est fugiat tempor sit do ex enim labore
            enim in Lorem.
          </Text>
          <View
            style={{ flexDirection: 'row', marginTop: Helper.normalize(24) }}>
            {renderShoes()}
          </View>
          <Header
            style={{ paddingHorizontal: 0, marginTop: Helper.normalize(24) }}
            titleStyle={{ fontSize: Helper.normalize(18) }}
            title={'Select Size'}
          />
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {renderSize()}
          </View>
        </Animated.View>
      </View>
      <ShoeCard
        progress={progress}
        enableShareElement
        absoluteX={coordinate.x}
        absoluteY={coordinate.y}
        onNavigate={() => {}}
        source={selectedItem.source}
        backgroundColor={selectedItem.backgroundColor}
        name={selectedItem.name}
        price={selectedItem.price}
        textPrimaryColor={selectedItem.textPrimaryColor}
        textSecondaryColor={selectedItem.textSecondaryColor}
        size={size}
      />
      <TouchableOpacity onPress={onPress} style={styles.backHolder}>
        <Animated.Text style={[styles.backText, animatedBackTextStyle]}>
          Back
        </Animated.Text>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentCon: {
    paddingTop: height * 0.4,
    paddingHorizontal: Helper.normalize(16),
    backgroundColor: 'white',
    flex: 1,
  },
  description: {
    color: '#7B8A9E',
    fontSize: Helper.normalize(16),
    marginVertical: Helper.normalize(10),
    letterSpacing: 1.2,
  },
  backHolder: {
    position: 'absolute',
    top: Helper.normalize(50),
    left: Helper.normalize(16),
  },
  backText: {
    color: 'white',
    fontSize: Helper.normalize(20),
    fontWeight: '600',
    letterSpacing: 1.1,
  },
});
