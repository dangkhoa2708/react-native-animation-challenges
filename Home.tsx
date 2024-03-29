import React from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
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
  {
    name: 'Animate Splash',
    screenID: ScreenID.ANIMATE_SPLASH,
  },
  {
    name: 'Parallax Swipe',
    screenID: ScreenID.PARALLAX_SWIPE,
  },
  {
    name: 'Feedback Faces',
    screenID: ScreenID.FEEDBACK_FACES,
  },
  {
    name: 'Pizza Challenge',
    screenID: ScreenID.PIZZA_CHALLENGE,
  },
  {
    name: 'Hold Menu',
    screenID: ScreenID.HOLD_MENU,
  },
  {
    name: 'Bomerang Card',
    screenID: ScreenID.BOMERANG_CARD,
  },
  {
    name: 'Grid Magnification',
    screenID: ScreenID.GRID_MANIFICATION,
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
