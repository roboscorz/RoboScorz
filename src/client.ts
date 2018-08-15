import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';

import env from '../env.json';

const httpLink = createHttpLink({
  uri: env.apiUrl
});

// Cached token from async storage
let token: string;

const authLink = setContext(async (req, { headers }) => {
  // Check if we have already cached the token
  if (!token) {
    // Fetch the token from the async storage
    token = await AsyncStorage.getItem('token');
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
