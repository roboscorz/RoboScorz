import { Transport } from '../utils/Transport';
import { IMatch, MatchFragment } from '../entity/Match';
import gql from 'graphql-tag';
import { Connection } from '../utils/schema';
import { MatchTeam } from '../entity/MatchTeam';
import { TeamFragment } from '../entity/Team';

export class MatchTransport extends Transport {

  public create(data: any): Promise<IMatch> {
    return Promise.reject(new Error('Matches cannot be created'));
  }

  public remove(id: string): Promise<IMatch> {
    return Promise.reject(new Error('Matches cannot be removed'));
  }

  public mutate(data: IMatch): Promise<IMatch> {
    return Promise.reject(new Error('Matches cannot be mutated'));
  }

  public node(id: string): Promise<IMatch> {
    return this.client.query<{ team: IMatch }>({
      query: gql`
        query MatchById($id: ID!) {
          match(id: $id) {
            ...MatchFragment
          }
        }
        ${MatchFragment}
      `,
      variables: {
        id
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.team;
    });
  }

  public find(
    first: number,
    after: string,
    filter: any,
    orderBy: any[]
  ): Promise<Connection<IMatch>> {
    return Promise.reject(new Error('Matches cannot be queried'));
  }

  public teams(matchId: string): Promise<MatchTeam[]> {
    return this.client.query<{ match: { teams: MatchTeam[] } }>({
      query: gql`
        query MatchTeams($matchId: ID!) {
          match(id: $matchId) {
            teams {
              team {
                  ...TeamFragment
              }
              side
              dq
              surrogate
            }
          }
        }
        ${TeamFragment}
      `,
      variables: {
        matchId
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.match.teams;
    });
  }
}
