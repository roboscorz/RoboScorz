import { observable, action } from 'mobx';
import { User } from '../entity/User';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { AsyncStorage } from 'react-native';
import stores from '.';

export enum AuthState {
  UNAUTHENTICATED,
  AUTHENTICATED,
  ERROR,
  PENDING
}

interface AuthData {
  authState: {
    isLoggedIn: boolean;
    expires: number;
    user?: User;
  };
}

interface LoginData {
  login: {
    user?: User;
    token: string;
    scopes: string[];
    expires: number;
  };
}

export class AuthStore {
  private client: ApolloClient<NormalizedCacheObject>;
  
  @observable authState: AuthState = AuthState.PENDING;
  @observable user: User | null = null;
  @observable token: string | null = null;
  @observable expires: number | null = null;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  @action
  public async logout(): Promise<AuthState> {
    await AsyncStorage.removeItem('token');
    this.authState = AuthState.UNAUTHENTICATED;
    this.user = null;
    this.token = null;
    this.expires = null;
    return this.authState;
  }

  @action
  public login(username: string, password: string): Promise<AuthState> {
    this.authState = AuthState.PENDING;
    return this.client.query<LoginData>({
      query: gql`
      query LoginQuery($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          expires
          user {
            id
            firstName
            lastName
            email
            provider
            providerId
            photoUrl
          }
        }
      }`,
      variables: {
        username,
        password
      }
    }).then(async (res) => {
      if (res.data.login.token) {
        await AsyncStorage.setItem('token', res.data.login.token);
        this.user = new User(res.data.login.user!, stores.user);
        this.token = res.data.login.token;
        this.expires = res.data.login.expires;
        this.authState = AuthState.AUTHENTICATED;
      } else {
        this.authState = AuthState.UNAUTHENTICATED;
      }
      return this.authState;
    }).catch((error) => {
      this.authState = AuthState.ERROR;
      return this.authState;
    });
  }

  @action
  public async getAuthState(): Promise<AuthState> {
    this.authState = AuthState.PENDING;
    return this.client.query<AuthData>({
      query: gql`{
        authState {
          isLoggedIn
          expires
          user {
            id
            firstName
            lastName
            email
            provider
            providerId
            photoUrl
          }
        }
      }`
    }).then(async (res) => {
      if (res.data.authState.isLoggedIn) {
        this.user = new User(res.data.authState.user!, stores.user);
        this.token = await AsyncStorage.getItem('token');
        this.expires = res.data.authState.expires;
        this.authState = AuthState.AUTHENTICATED;
      } else {
        await AsyncStorage.removeItem('token');
        this.authState = AuthState.UNAUTHENTICATED;
      }
      return this.authState;
    }).catch(async (error) => {
      await AsyncStorage.removeItem('token');
      this.authState = AuthState.ERROR;
      return this.authState;
    });
  }
}
