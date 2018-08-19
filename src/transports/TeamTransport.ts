import { Transport } from '../utils/Transport';
import { ITeam, TeamFragment } from '../entity/Team';
import gql from 'graphql-tag';
import { Connection } from '../utils/schema';
import { Award } from '../entity/Award';
import { EventFragment, IEvent } from '../entity/Event';

export class TeamTransport extends Transport {

  public create(data: any): Promise<ITeam> {
    return Promise.reject(new Error('Teams cannot be created'));
  }

  public remove(id: string): Promise<ITeam> {
    return Promise.reject(new Error('Teams cannot be removed'));
  }

  public mutate(data: ITeam): Promise<ITeam> {
    return Promise.reject(new Error('Teams cannot be mutated'));
  }

  public node(id: string): Promise<ITeam> {
    return this.client.query<{ team: ITeam }>({
      query: gql`
        query TeamById($id: ID!) {
          team(id: $id) {
            ...TeamFragment
          }
        }
        ${TeamFragment}
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
  ): Promise<Connection<ITeam>> {
    return this.client.query<{ teams: Connection<ITeam> }>({
      query: gql`
        query TeamsQuery(
            $first: Int, 
            $after: String, 
            $filter: TeamFilter, 
            $orderBy: [TeamOrder]
          ) {
          teams(
            first: $first, 
            after: $after, 
            filter: $filter, 
            orderBy: $orderBy
          ) {
            ...TeamFragment
          }
        }
        ${TeamFragment}
      `,
      variables: {
        first,
        after,
        filter,
        orderBy
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.teams;
    });
  }

  public awards(teamId: string): Promise<Award[]> {
    return this.client.query<{ team: { awards: Award[] } }>({
      query: gql`
        query TeamAwardsQuery($teamId: ID!) {
          team(id: $teamId) {
            id
            awards {
              type
              name
              year
            }
          }
        }
      `,
      variables: {
        teamId
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.team.awards;
    });
  }

  public events(teamId: string): Promise<IEvent[]> {
    return this.client.query<{ team: { events: IEvent[] } }>({
      query: gql`
        query TeamEventsQuery($teamId: ID!) {
          team(id: $teamId) {
            id
            events {
              ...EventFragment
            }
          }
        }
        ${EventFragment}
      `,
      variables: {
        teamId
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.team.events;
    });
  }
}
