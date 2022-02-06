import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  ScrollView,
  View,
  StyleSheet,
  LayoutChangeEvent,
  Modal,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import images from '../../common/images';
import Helper from '../../Helper';
import Category from './Category';
import Header from './Header';
import ModalScreen from './ModalScreen';
import Product from './Product';
import ShoeCard from './ShoeCard';

const { width } = Dimensions.get('window');

export type DataType = {
  source: ImageSourcePropType;
  backgroundColor: string;
  name: string;
  price: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
};

const listData: Array<DataType> = [
  {
    source: images.imgRedShoe,
    backgroundColor: '#E24C4D',
    name: 'Alpha Savage',
    price: '$120',
    textPrimaryColor: 'white',
    textSecondaryColor: 'rgba(250,250,250,0.7)',
  },
  {
    source: images.imgYellowShoe,
    backgroundColor: '#FDBA62',
    name: 'Air Max 97',
    price: '$140',
    textPrimaryColor: 'black',
    textSecondaryColor: 'rgba(0,0,0,0.7)',
  },
  {
    source: images.imgBlueShoe,
    backgroundColor: '#4B81F4',
    name: 'KD13 EP',
    price: '$180',
    textPrimaryColor: 'white',
    textSecondaryColor: 'rgba(250,250,250,0.7)',
  },
  {
    source: images.imgGreenShoe,
    backgroundColor: '#599C99',
    name: 'Air Presto by you',
    price: '$160',
    textPrimaryColor: 'white',
    textSecondaryColor: 'rgba(250,250,250,0.7)',
  },
];

const listCategory = [
  { text: 'All' },
  { text: 'Air Max' },
  { text: 'Presto' },
  { text: 'Hurache' },
  { text: 'Converse' },
  { text: 'Nike' },
];

const listProduct = [
  {
    name: 'Occaecat est ad et nisi duis aute culpa ullamco culpa et.',
    price: '$120',
    source: images.imgGreenShoe,
  },
  {
    name: 'Anim ex exercitation enim elit ut proident nulla tempor anim eiusmod nisi.',
    price: '$80',
    source: images.imgBlueShoe,
  },
  {
    name: 'Voluptate ullamco labore velit anim aliqua exercitation laboris amet culpa enim consequat amet culpa.',
    price: '$60',
    source: images.imgYellowShoe,
  },
  {
    name: 'Voluptate ullamco labore velit anim aliqua exercitation laboris amet culpa enim consequat amet culpa.',
    price: '$60',
    source: images.imgYellowShoe,
  },
  {
    name: 'Voluptate ullamco labore velit anim aliqua exercitation laboris amet culpa enim consequat amet culpa.',
    price: '$60',
    source: images.imgYellowShoe,
  },
];

const ITEM_SIZE = width - Helper.normalize(24 + 48);

const renderProducts = () => {
  return listProduct.map((e, index) => {
    return (
      <Product key={index} name={e.name} price={e.price} source={e.source} />
    );
  });
};

const renderCategories = () => {
  return listCategory.map((e, index) => {
    return (
      <Category
        key={index}
        style={{ marginRight: Helper.normalize(5) }}
        text={e.text}
        isActive={index == 0}
      />
    );
  });
};

export type Coordinate = {
  x: number;
  y: number;
};

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ParallaxSwipe() {
  const scrollValue = useSharedValue(0);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataType>(listData[0]);
  const [coordinate, setCoordinate] = useState<Coordinate>({ x: 0, y: 0 });
  const [hiddenIndex, setHiddenIndex] = useState(-1);

  const renderItem = ({ item, index }: any) => {
    const onNavigate = (x: number, y: number) => {
      setVisible(true);
      setSelectedItem(item);
      setCoordinate({ x, y });
      setHiddenIndex(index);
    };
    return (
      <ShoeCard
        style={{ opacity: index == hiddenIndex ? 0 : 1 }}
        onNavigate={onNavigate}
        index={index}
        scrollValue={scrollValue}
        source={item.source}
        backgroundColor={item.backgroundColor}
        name={item.name}
        price={item.price}
        textPrimaryColor={item.textPrimaryColor}
        textSecondaryColor={item.textSecondaryColor}
        size={ITEM_SIZE}
      />
    );
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollValue.value = event.contentOffset.x;
    },
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header style={{ marginTop: Helper.normalize(70) }} title="Shoes" />
      <View
        style={{
          flexDirection: 'row',
          marginLeft: Helper.normalize(16),
          marginTop: Helper.normalize(16),
        }}>
        {renderCategories()}
      </View>
      <AnimatedFlatList
        style={{ marginTop: Helper.normalize(24) }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate={0}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: Helper.normalize(24),
        }}
        data={listData}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        keyExtractor={(item: any) => `${item.name}`}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={onScroll}
      />
      <Text style={styles.optionText}>243 options</Text>
      <View>{renderProducts()}</View>
      <ModalScreen
        visible={visible}
        coordinate={coordinate}
        selectedItem={selectedItem}
        size={ITEM_SIZE}
        onClose={() => {
          setHiddenIndex(-1);
          setVisible(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  optionText: {
    opacity: 0.7,
    fontSize: Helper.normalize(12),
    color: '#1F2732',
    marginLeft: Helper.normalize(16),
    marginTop: Helper.normalize(50),
    marginBottom: Helper.normalize(10),
  },
});
