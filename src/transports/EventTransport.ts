import { Transport, FindArgs } from '../utils/Transport';
import { IEvent, EventFragment } from '../entity/Event';
import gql from 'graphql-tag';
import { Connection } from '../utils/schema';
import { IMatch, MatchFragment } from '../entity/Match';
import { ITeam, TeamFragment } from '../entity/Team';
import { Article } from '../entity/Article';
import { Alliance } from '../entity/Alliance';
import { Award } from '../entity/Award';
import { Ranking } from '../entity/Ranking';
import { Location, Units } from '../entity/Location';

export class EventTransport extends Transport {

  public create(data: any): Promise<IEvent> {
    return Promise.reject(new Error('Events cannot be created'));
  }

  public remove(id: string): Promise<IEvent> {
    return Promise.reject(new Error('Events cannot be removed'));
  }

  public mutate(data: IEvent): Promise<IEvent> {
    return Promise.reject(new Error('Events cannot be mutated'));
  }

  public node(id: string): Promise<IEvent> {
    return this.client.query<{ event: IEvent }>({
      query: gql`
        query EventById($id: ID!) {
          event(id: $id) {
            ...EventFragment
          }
        }
        ${EventFragment}
      `,
      variables: {
        id
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.event;
    });
  }

  public yearCode(year: number, code: string): Promise<IEvent> {
    return this.client.query<{ eventByYearCode: IEvent }>({
      query: gql`
        query EventByYearCode($year: Int!, $code: String!) {
          eventByYearCode(year: $year, code: $code) {
            ...EventFragment
          }
        }
        ${EventFragment}
      `,
      variables: {
        year,
        code
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.eventByYearCode;
    });
  }

  public code(seasonId: string, code: string): Promise<IEvent> {
    return this.client.query<{ eventByCode: IEvent }>({
      query: gql`
        query EventByCode($seasonId: ID!, $code: String!) {
          eventByCode(seasonId: $seasonId, code: $code) {
            ...EventFragment
          }
        }
        ${EventFragment}
      `,
      variables: {
        seasonId,
        code
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.eventByCode;
    });
  }

  public findByLocation(
    location: Location,
    distance: number,
    units: Units,
    args?: FindArgs
  ): Promise<Connection<IEvent>> {
    return this.client.query<{ eventsByLocation: Connection<IEvent> }>({
      query: gql`
        query EventsQuery(
            $location: LocationInput!,
            $distance: Int!,
            $units: Units!,
            $first: Int, 
            $after: String, 
            $filter: EventFilter, 
            $orderBy: [EventOrder], 
            $dateRange: DateRange
          ) {
          eventsByLocation(
            location: $location,
            distance: $distance,
            units: $units,
            first: $first, 
            after: $after, 
            filter: $filter, 
            orderBy: $orderBy, 
            dateRange: $dateRange
          ) {
            edges {
              node {
                ...EventFragment
              }
            }
          }
        }
        ${EventFragment}
      `,
      variables: {
        location,
        distance,
        units,
        ...args
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.eventsByLocation;
    });
  }

  public find(args: FindArgs): Promise<Connection<IEvent>> {
    return this.client.query<{ events: Connection<IEvent> }>({
      query: gql`
        query EventsQuery(
            $first: Int, 
            $after: String, 
            $filter: EventFilter, 
            $orderBy: [EventOrder], 
            $dateRange: DateRange
          ) {
          events(
            first: $first, 
            after: $after, 
            filter: $filter, 
            orderBy: $orderBy, 
            dateRange: $dateRange
          ) {
            edges {
              node {
                ...EventFragment
              }
            }
          }
        }
        ${EventFragment}
      `,
      variables: args
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.events;
    });
  }

  public divisions(
    eventId: string,
    args?: FindArgs
  ): Promise<Connection<IEvent>> {
    return this.client.query<{ event: { divisions: Connection<IEvent> } }>({
      query: gql`
        query EventDivisionsQuery(
            $eventId: ID!,
            $first: Int, 
            $after: String, 
            $filter: EventFilter, 
            $orderBy: [EventOrder]
          ) {
          event(id: $eventId) {
            id
            divisions(
              first: $first, 
              after: $after, 
              filter: $filter, 
              orderBy: $orderBy
            ) {
              edges {
                node {
                  ...EventFragment
                }
              }
            }
          }
        }
        ${EventFragment}
      `,
      variables: {
        eventId,
        ...args
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.event.divisions;
    });
  }

  public matches(
    eventId: string,
    args?: FindArgs
  ): Promise<Connection<IMatch>> {
    return this.client.query<{ event: { matches: Connection<IMatch> } }>({
      query: gql`
        query EventMatchesQuery(
            $eventId: ID!,
            $first: Int, 
            $after: String, 
            $filter: MatchFilter, 
            $orderBy: [MatchOrder]
          ) {
          event(id: $eventId) {
            id
            matches(
              first: $first, 
              after: $after, 
              filter: $filter, 
              orderBy: $orderBy
            ) {
              edges {
                node {
                  ...MatchFragment
                }
              }
            }
          }
        }
        ${MatchFragment}
      `,
      variables: {
        eventId,
        ...args
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.event.matches;
    });
  }

  public teams(
    eventId: string,
    args?: FindArgs
  ): Promise<Connection<ITeam>> {
    return this.client.query<{ event: { teams: Connection<ITeam> } }>({
      query: gql`
        query EventTeamsQuery(
            $eventId: ID!,
            $first: Int, 
            $after: String, 
            $filter: TeamFilter, 
            $orderBy: [TeamOrder]
          ) {
          event(id: $eventId) {
            id
            teams(
              first: $first, 
              after: $after, 
              filter: $filter, 
              orderBy: $orderBy
            ) {
              edges {
                node {
                  ...TeamFragment
                }
              }
            }
          }
        }
        ${TeamFragment}
      `,
      variables: {
        eventId,
        ...args
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.event.teams;
    });
  }

  public articles(eventId: string): Promise<Article[]> {
    return this.client.query<{ event: { articles: Article[] } }>({
      query: gql`
        query EventArticlesQuery($eventId: ID!) {
          event(id: $eventId) {
            id
            articles {
              id
              featured
              title
              tags
              data
              photoUrl
              description
            }
          }
        }
      `,
      variables: {
        eventId
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.event.articles;
    });
  }

  public alliances(eventId: string): Promise<Alliance[]> {
    return this.client.query<{ event: { alliances: Alliance[] } }>({
      query: gql`
        query EventAlliancesQuery($eventId: ID!) {
          event(id: $eventId) {
            id
            alliances {
              number
              name
              captain {
                ...TeamFragment
              }
              picks {
                ...TeamFragment
              }
              backup {
                ...TeamFragment
              }
              backupReplaced {
                ...TeamFragment
              }
            }
          }
        }
        ${TeamFragment}
      `,
      variables: {
        eventId
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.event.alliances;
    });
  }

  public awards(eventId: string): Promise<Award[]> {
    return this.client.query<{ event: { awards: Award[] } }>({
      query: gql`
        query EventAwardsQuery($eventId: ID!) {
          event(id: $eventId) {
            id
            awards {
              type
              name
              recipients {
                team {
                  ...TeamFragment
                }
                person
              }
              year
            }
          }
        }
        ${TeamFragment}
      `,
      variables: {
        eventId
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.event.awards;
    });
  }

  public rankings(eventId: string): Promise<Ranking[]> {
    return this.client.query<{ event: { rankings: Ranking[] } }>({
      query: gql`
        query EventRankingsQuery($eventId: ID!) {
          event(id: $eventId) {
            id
            rankings {
              rank
              dq
              matchesPlayed
              losses
              wins
              ties
              team {
                ...TeamFragment
              }
            }
          }
        }
        ${TeamFragment}
      `,
      variables: {
        eventId
      }
    }).then((res) => {
      if (res.errors) throw res.errors;
      return res.data.event.rankings;
    });
  }
}
