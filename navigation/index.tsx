import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AnimateSplash from '../components/AnimateSplash';
import WaterScreen from '../components/animateWave/WaveScreen';
import BomerangCardScreen from '../components/BomerangCard';
import ChewingGumScreen from '../components/chewingGumCard/Main';
import Duolingo from '../components/duolingo';
import FeedbackFaces from '../components/FeedbackFaces';
import GridMaginication from '../components/GridMagnification';
import HoldMenuScreen from '../components/HoldMenu';
import ParallaxSwipe from '../components/ParallaxSwipe';
import PizzaChallenge from '../components/PizzaChallange';
import ScrollDishes from '../components/ScrollDishes';
import TinderScreen from '../components/tinderCard/App';
import Home from '../Home';
import ScreenID from './ScreenID';

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
        <Stack.Screen name={ScreenID.WAVE_SCREEN} component={WaterScreen} />
        <Stack.Screen name={ScreenID.DUOLINGO} component={Duolingo} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ScreenID.SCROLL_DISHES}
          component={ScrollDishes}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ScreenID.ANIMATE_SPLASH}
          component={AnimateSplash}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ScreenID.PARALLAX_SWIPE}
          component={ParallaxSwipe}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ScreenID.FEEDBACK_FACES}
          component={FeedbackFaces}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ScreenID.PIZZA_CHALLENGE}
          component={PizzaChallenge}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ScreenID.HOLD_MENU}
          component={HoldMenuScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ScreenID.BOMERANG_CARD}
          component={BomerangCardScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ScreenID.GRID_MANIFICATION}
          component={GridMaginication}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationMain;
