import { Transport } from '../utils/Transport';
import { IUser, CreateUserInput } from '../entity/User';
import gql from 'graphql-tag';
import { Connection } from '../utils/schema';
import { ApolloQueryResult } from 'apollo-client';

export class UserTransport extends Transport {

  public create(data: CreateUserInput): Promise<IUser> {
    return this.client.mutate<{ createUser: IUser }>({
      mutation: gql`
        {
          createUser(user: $user) {
            id
            firstName
            lastName
            email
            provider
            providerId
            photoUrl
          }
        }
      `,
      variables: {
        user: data
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      if (res.data) {
        return res.data.createUser;
      }
      return null;
    });
  }

  public remove(id: string): Promise<IUser> {
    return Promise.reject(new Error('Users cannot be removed'));
  }

  public mutate(data: IUser): Promise<IUser> {
    return Promise.reject(new Error('Users cannot be mutated'));
  }

  public node(id: string): Promise<IUser> {
    return this.client.query<{ user: IUser }>({
      query: gql`
        query UserById($id: ID!) {
          user(id: $id) {
            id
            firstName
            lastName
            email
            provider
            providerId
            photoUrl
          }
        }
      `,
      variables: {
        id
      }
    }).then((res: ApolloQueryResult<any>) => {
      if (res.errors) throw res.errors;
      return res.data.user;
    });
  }

  // Users cannot be queried by the client
  public find(
    first: number,
    after: string,
    filter: any,
    orderBy: any[]
  ): Promise<Connection<IUser>> {
    return Promise.reject(new Error('Users cannot be queried'));
  }
}
