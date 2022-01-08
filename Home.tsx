import React from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, Text } from 'react-native';
import ScreenID from './navigation/ScreenID';

type AppProps = {
  navigation: any;
};

type DataItem = {
  name: string;
  screenID: string;
};

const data: Array<DataItem> = [
  {
    name: 'Tinder Card',
    screenID: ScreenID.TINDER_CARD,
  },
  {
    name: 'Chewing Gum Card',
    screenID: ScreenID.CHEWING_GUM_CARD,
  },
  {
    name: 'Wave Screen',
    screenID: ScreenID.WAVE_SCREEN,
  },
  {
    name: 'Duolingo',
    screenID: ScreenID.DUOLINGO,
  },
  {
    name: 'Scroll Dishes',
    screenID: ScreenID.SCROLL_DISHES,
  },
];

export default function Home({ navigation }: AppProps) {
  const renderItem = ({ item }: { item: DataItem }) => {
    return (
      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => {
          navigation.navigate(item.screenID);
        }}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={e => `${e.name}`}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
