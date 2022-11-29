import React, { useState } from 'react';
import { FlatList } from 'react-native';
import Card from './Card';

export type Item = {
  backgroundColor: string;
  fieldColor: string;
};

const fakeData: Array<Item> = [
  //   {
  //     backgroundColor: 'cyan',
  //   },
  {
    backgroundColor: '#ffbf80',
    fieldColor: '#e67300',
  },
  {
    backgroundColor: '#66d9ff',
    fieldColor: '#0086b3',
  },
  {
    backgroundColor: '#33ff99',
    fieldColor: '#00994d',
  },
  {
    backgroundColor: '#f2f2f2',
    fieldColor: '#b3b3b3',
  },
];

const widthCard = 280;
const heightCard = 200;

export default function BomerangCardScreen() {
  const [data, setData] = useState([...fakeData]);
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      style={{ backgroundColor: 'rgba(0,0,0,1)', flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: heightCard * 2,
      }}
      keyExtractor={item => item.backgroundColor}
      renderItem={({ item, index }) => {
        return (
          <Card
            widthCard={widthCard}
            heightCard={heightCard}
            item={item}
            style={{
              position: 'absolute',
              //   left: -widthCard / 2,
              //   top: index * 10,
              alignSelf: 'center',
              zIndex: index,
            }}
            index={index}
            onExit={item => {
              data.pop();
              data.unshift(item);
              setData([...data]);
            }}
            backgroundColor={item.backgroundColor}
            fieldColor={item.fieldColor}
          />
        );
      }}
    />
  );
}
