import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import env from '../env.json';

const client = new ApolloClient({
  link: new HttpLink({
    uri: env.apiUrl
  }),
  cache: new InMemoryCache()
});

export default client;
