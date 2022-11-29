import React from 'react';
import { Text, View } from 'react-native';
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
    <View style={{ flex: 1 }}>
      <HoldMenuProvider>
        <View style={{ paddingTop: 100, flex: 1, alignItems: 'baseline' }}>
          <HoldItem
            style={{
              marginLeft: 20,
              marginTop: 50,
            }}
            menuItems={fakeItems}>
            <View
              style={{
                padding: 10,
                backgroundColor: 'yellow',
                borderRadius: 20,
                maxWidth: 250,
              }}>
              <Text>Heloodsadskjdhajshdkjashdkajsdhkjaasdasdsdsdhjkasdh</Text>
            </View>
          </HoldItem>
          <HoldItem
            style={{
              marginLeft: 100,
              marginTop: 50,
              // maxWidth: 250,
            }}
            menuItems={fakeItems}>
            <View
              style={{
                backgroundColor: 'blue',
                borderRadius: 20,

                padding: 10,
              }}>
              <Text style={{ color: 'white' }}>
                Heasdasdsdsaasdasddadasdasasdasdasdasdasdsadasddasdasdasdasdsdasdassdas
              </Text>
            </View>
          </HoldItem>
          <HoldItem
            style={{
              marginLeft: 20,
              marginTop: 50,
              // maxWidth: 250,
            }}
            menuItems={fakeItems}>
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 20,

                padding: 10,
              }}>
              <Text style={{ color: 'white' }}>Heasdas</Text>
            </View>
          </HoldItem>
          <HoldItem
            style={{
              marginLeft: 300,
              marginTop: 50,
              // maxWidth: 250,
            }}
            menuItems={fakeItems}>
            <View
              style={{
                backgroundColor: 'green',
                borderRadius: 20,

                padding: 10,
              }}>
              <Text style={{ color: 'white' }}>Heasdas</Text>
            </View>
          </HoldItem>
          <HoldItem
            style={{ marginTop: 270, marginLeft: 20 }}
            menuItems={fakeItems2}>
            <View
              style={{
                padding: 10,
                backgroundColor: 'grey',
                maxWidth: 150,
                borderRadius: 20,
              }}>
              <Text>
                Heloodsadskjdhajshdkasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
              </Text>
            </View>
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
    </View>
  );
}
