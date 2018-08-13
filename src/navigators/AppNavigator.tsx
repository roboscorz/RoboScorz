import { NavigationRouteConfigMap } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Explore from '../pages/Explore';
import { RoboScorzTheme } from '../theme/RoboScorzTheme';

// Create the app route config
const appRouteConfig: NavigationRouteConfigMap = {
  Explore
};

const AppNavigator = createMaterialBottomTabNavigator(appRouteConfig, {
  initialRouteName: 'Explore',
  activeTintColor: RoboScorzTheme.build('light').primary,
  barStyle: {
    backgroundColor: RoboScorzTheme.build('light').surfaceColor.light
  }
});

export default AppNavigator;
