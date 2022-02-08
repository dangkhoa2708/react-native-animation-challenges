import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenID from './ScreenID';
import TinderScreen from '../components/tinderCard/App';
import ChewingGumScreen from '../components/chewingGumCard/Main';
import Home from '../Home';
import WaterScreen from '../components/animateWave/WaveScreen';
import Duolingo from '../components/duolingo';
import ScrollDishes from '../components/ScrollDishes';
import AnimateSplash from '../components/AnimateSplash';
import ParallaxSwipe from '../components/ParallaxSwipe';
import FeedbackFaces from '../components/FeedbackFaces';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationMain;
