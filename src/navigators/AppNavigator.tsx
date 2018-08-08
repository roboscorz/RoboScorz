import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createDrawerNavigator,
  NavigationRouteConfigMap,
  NavigationContainer
} from 'react-navigation';

import Explore from '../pages/Explore';

// Create the app route config
const appRouteConfig: NavigationRouteConfigMap = {
  Explore
};

let AppNavigator: NavigationContainer;

// Switch navigation type depending on platform
if (Platform.OS === 'ios') {
  AppNavigator = createBottomTabNavigator(appRouteConfig, {
    initialRouteName: 'Explore'
  });
} else {
  AppNavigator = createDrawerNavigator(appRouteConfig, {
    initialRouteName: 'Explore'
  });
}

export default AppNavigator;
