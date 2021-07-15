import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenID from './ScreenID';
import TinderScreen from '../components/tinderCard/App';
import ChewingGumScreen from '../components/chewingGumCard/Main';
import Home from '../Home';

const Stack = createStackNavigator();

function NavigationMain() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenID.HOME}>
        <Stack.Screen name={ScreenID.HOME} component={Home} />
        <Stack.Screen name={ScreenID.TINDER_CARD} component={TinderScreen} />
        <Stack.Screen
          name={ScreenID.CHEWING_GUM_CARD}
          component={ChewingGumScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationMain;