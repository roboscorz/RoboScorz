import React, { Component } from 'react';
import RootNavigator from './navigators/RootNavigatior';
import { StatusBar } from 'react-native';
import { Theme, RoboScorzTheme } from './theme';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'mobx-react';
import client from './client';
import stores from './stores';
import { Auth } from './Auth';

export default class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider {...stores}>
          <Theme theme={RoboScorzTheme}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <Auth>
              <RootNavigator/>
            </Auth>
          </Theme>
        </Provider>
      </ApolloProvider>
    );
  }
}
