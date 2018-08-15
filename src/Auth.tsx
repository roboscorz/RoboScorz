import React, { Component } from 'react';
import { AuthStore } from './stores/AuthStore';
import SplashScreen from 'react-native-splash-screen';
import { inject } from 'mobx-react';

interface AuthProps {
  auth?: AuthStore;
}

@inject('auth')
export class Auth extends Component<AuthProps> {

  componentDidMount() {
    this.props.auth!.getAuthState().then((authState) => {
      SplashScreen.hide();
    }).catch(() => {
      SplashScreen.hide();
    });
  }

  render() {
    return this.props.children;
  }
}
