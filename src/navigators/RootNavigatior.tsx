import { createSwitchNavigator } from 'react-navigation';

// Import other navigators
import AppNavigator from './AppNavigator';

// Create the root navigator
const RootNavigator = createSwitchNavigator({
  App: AppNavigator
}, {
  initialRouteName: 'App'
});

export default RootNavigator;
