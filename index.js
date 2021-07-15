/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import NavigationMain from './navigation';

AppRegistry.registerComponent(appName, () => NavigationMain);
