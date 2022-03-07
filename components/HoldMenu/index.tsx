import { BlurView } from 'expo-blur';
import React from 'react';
import { ImageBackground, Modal, StyleSheet, Text, View } from 'react-native';
import HoldItem from './components/holdItem';
import { MenuItem } from './components/menu/types';
import HoldMenuProvider from './components/provider/HoldMenuProvider';

const fakeItems: Array<MenuItem> = [
  {
    text: 'Action 1',
    onPress: () => {},
    withSeparator: true,
  },
  {
    text: 'Action 2',
    onPress: () => {},
    withSeparator: true,
  },
  {
    text: 'Action 3',
    onPress: () => {},
    withSeparator: false,
  },
];

const fakeItems2: Array<MenuItem> = [
  {
    text: 'Action 1',
    onPress: () => {},
    withSeparator: true,
  },
  {
    text: 'Action 2',
    onPress: () => {},
    withSeparator: true,
  },
  {
    text: 'Action 4',
    onPress: () => {},
    withSeparator: false,
  },
];

export default function HoldMenuScreen() {
  return (
    <HoldMenuProvider>
      <View style={{ paddingTop: 100, flex: 1, alignItems: 'baseline' }}>
        <HoldItem
          style={{
            marginLeft: 200,
          }}
          menuItems={fakeItems}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'red',
            }}
          />
        </HoldItem>
        <HoldItem style={{ marginTop: 500 }} menuItems={fakeItems}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'red',
            }}
          />
        </HoldItem>

        <View
          style={{
            marginTop: 50,

            width: 100,
            height: 100,
            backgroundColor: 'red',
          }}
        />
      </View>
    </HoldMenuProvider>
  );
}
