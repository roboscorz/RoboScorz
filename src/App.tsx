import React, { Component } from 'react';
import RootNavigator from './navigators/RootNavigatior';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar, View } from 'react-native';

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
        <RootNavigator/>
      </View>
    );
  }
}
