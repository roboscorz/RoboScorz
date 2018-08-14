import React, { Component } from 'react';
import RootNavigator from './navigators/RootNavigatior';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { Theme, RoboScorzTheme } from './theme';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import gql from 'graphql-tag';
export default class App extends Component {

  componentDidMount() {
    client.query({
      query: gql`{
        authState {
          isLoggedIn
          user {
            id
            firstName
            lastName
            email
          }
        }
      }`
    }).then((data) => {
      console.log(data);
      SplashScreen.hide();
    }).catch((error) => {
      SplashScreen.hide();
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Theme theme={RoboScorzTheme}>
          <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
          <RootNavigator/>
        </Theme>
      </ApolloProvider>
    );
  }
}
