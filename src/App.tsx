import React, { Component } from 'react';
import RootNavigator from './navigators/RootNavigatior';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, View } from 'react-native';
import { ThemeProvider, RoboScorzTheme } from './theme';
export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <ThemeProvider value={RoboScorzTheme}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
        <RootNavigator/>
      </ThemeProvider>
    );
  }
}
