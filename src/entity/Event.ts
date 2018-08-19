import { observable, computed, action } from 'mobx';
import { Entity } from '../utils/Entity';
import { Node } from '../utils/schema';
import { Program, Team } from './Team';
import { Article } from './Article';
import { Alliance } from './Alliance';
import { Country } from './Country';
import { Season } from './Season';
import { Award } from './Award';
import { Match } from './Match';
import { Ranking } from './Ranking';
import { Location } from './Location';
import { EventStore } from '../stores/EventStore';
import { EntityState } from '../utils/Store';
import gql from 'graphql-tag';
import stores from '../stores';

export enum EventType {
  UNLABLED = 'UNLABLED',
  KICKOFF = 'KICKOFF',
  WORKSHOP = 'WORKSHOP',
  SCRIMMAGE = 'SCRIMMAGE',
  INTERVIEW_ONLY = 'INTERVIEW_ONLY',
  MEET = 'MEET',
  QUALIFYING_EVENT = 'QUALIFYING_EVENT',
  _2ND_TIER_QUALIFYING_EVENT = '_2ND_TIER_QUALIFYING_EVENT',
  SUPER_REGIONAL = 'SUPER_REGIONAL',
  REGIONAL = 'REGIONAL',
  DISTRICT_EVENT = 'DISTRICT_EVENT',
  DISTRICT_CHAMPIONSHIP = 'DISTRICT_CHAMPIONSHIP',
  DISTRICT_CHAMPIONSHIP_WITH_LEVELS = 'DISTRICT_CHAMPIONSHIP_WITH_LEVELS',
  DISTRICT_CHAMPIONSHIP_DIVISION = 'DISTRICT_CHAMPIONSHIP_DIVISION',
  CHAMPIONSHIP_SUBDIVISION = 'CHAMPIONSHIP_SUBDIVISION',
  CHAMPIONSHIP_DIVISION = 'CHAMPIONSHIP_DIVISION',
  CHAMPIONSHIP = 'CHAMPIONSHIP',
  WORLD_FESTIVAL = 'WORLD_FESTIVAL',
  OFF_SEASON = 'OFF_SEASON',
  FOC = 'FOC',
  OFF_SEASON_WITH_AZURE_SYNC = 'OFF_SEASON_WITH_AZURE_SYNC',
  OFFICIAL_EXPO = 'OFFICIAL_EXPO',
  TRAINING_EDUCATION = 'TRAINING_EDUCATION',
  DISPLAY_DEMONSTRATION = 'DISPLAY_DEMONSTRATION',
  OTHER = 'OTHER',
  SPRING_EVENT = 'SPRING_EVENT',
  SUPER_QUALIFIER = 'SUPER_QUALIFIER'
}

export enum PlayoffType {
  BRACKET_8_TEAM = 'BRACKET_8_TEAM',
  BRACKET_16_TEAM = 'BRACKET_16_TEAM',
  BRACKET_4_TEAM = 'BRACKET_4_TEAM',
  AVG_SCORE_8_TEAM = 'AVG_SCORE_8_TEAM',
  ROUND_ROBIN_6_TEAM = 'ROUND_ROBIN_6_TEAM',
  DOUBLE_ELIM_8_TEAM = 'DOUBLE_ELIM_8_TEAM',
  BO5_FINALS = 'BO5_FINALS',
  BO3_FINALS = 'BO3_FINALS'
}

export interface IEvent extends Node {
  code?: string;
  address?: string;
  name?: string;
  description?: string;
  season?: Season;
  district?: string;
  playoffType?: PlayoffType;
  venue?: string;
  city?: string;
  countryCode?: string;
  country?: Country;
  timezone?: string;
  week?: number;
  stateProv?: string;
  postalCode?: string;
  dateStart?: string;
  dateEnd?: string;
  type?: EventType;
  website?: string;
  program?: Program;
  photoUrl?: string;
  articles?: Article[];
  alliances?: Alliance[];
  awards?: Award[];
  rankings?: Ranking[];
  location?: Location;
  placeId?: string;
}

export class Event extends Entity<EventStore> implements IEvent {
  public code?: string;
  public parentId?: string;
  
  @observable teams: Team[] = [];
  @observable divisions: Event[] = [];
  @observable matches: Match[] = [];
  @observable articles: Article[] = [];
  @observable alliances: Alliance[] = [];
  @observable awards: Award[] = [];
  @observable rankings: Ranking[] = [];

  @observable teamsFetchState: EntityState = EntityState.PENDING; 
  @observable divisionsFetchState: EntityState = EntityState.PENDING; 
  @observable matchesFetchState: EntityState = EntityState.PENDING; 
  @observable articlesFetchState: EntityState = EntityState.PENDING; 
  @observable alliancesFetchState: EntityState = EntityState.PENDING; 
  @observable awardsFetchState: EntityState = EntityState.PENDING; 
  @observable rankingsFetchState: EntityState = EntityState.PENDING; 

  @observable address?: string;
  @observable name?: string;
  @observable description?: string;
  @observable season?: Season;
  @observable district?: string;
  @observable playoffType?: PlayoffType;
  @observable venue?: string;
  @observable city?: string;
  @observable countryCode?: string;
  @observable country?: Country;
  @observable timezone?: string;
  @observable week?: number;
  @observable stateProv?: string;
  @observable postalCode?: string;
  @observable dateStart?: string;
  @observable dateEnd?: string;
  @observable type?: EventType;
  @observable website?: string;
  @observable program?: Program;
  @observable photoUrl?: string;
  @observable location?: Location;
  @observable placeId?: string;

  constructor(data: IEvent, store: EventStore, parentId?: string) {
    super(store, data.id, true);
    this.parentId = parentId;
    this.articles = data.articles || [];
    this.alliances = data.alliances || [];
    this.awards = data.awards || [];
    this.rankings = data.rankings || [];
    this.code = data.code;
    this.address = data.address;
    this.name = data.name;
    this.description = data.description;
    this.season = data.season;
    this.district = data.district;
    this.playoffType = data.playoffType;
    this.venue = data.venue;
    this.city = data.city;
    this.countryCode = data.countryCode;
    this.country = data.country;
    this.timezone = data.timezone;
    this.week = data.week;
    this.stateProv = data.stateProv;
    this.postalCode = data.postalCode;
    this.dateStart = data.dateStart;
    this.dateEnd = data.dateEnd;
    this.type = data.type;
    this.website = data.website;
    this.program = data.program;
    this.photoUrl = data.photoUrl;
    this.location = data.location;
    this.placeId = data.placeId;
  }

  @action
  public fetchDivisions(): Promise<Event[]> {
    this.divisionsFetchState = EntityState.PENDING;
    this.divisions = [];
    return this.store.transport.divisions(this.id!).then((value) => {
      for (const edge of value.edges) {
        this.divisions.push(new Event(edge.node, this.store, this.id));
      }
      this.divisionsFetchState = EntityState.DONE;
      return this.divisions;
    }).catch((error) => {
      this.divisionsFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @action
  public fetchMatches(): Promise<Match[]> {
    this.matchesFetchState = EntityState.PENDING;
    this.matches = [];
    return this.store.transport.matches(this.id!).then((value) => {
      for (const edge of value.edges) {
        this.matches.push(new Match(edge.node, stores.match));
      }
      this.matchesFetchState = EntityState.DONE;
      return this.matches;
    }).catch((error) => {
      this.matchesFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @action
  public fetchTeams(): Promise<Team[]> {
    this.teamsFetchState = EntityState.PENDING;
    this.teams = [];
    return this.store.transport.teams(this.id!).then((value) => {
      for (const edge of value.edges) {
        this.teams.push(new Team(edge.node, stores.team));
      }
      this.teamsFetchState = EntityState.DONE;
      return this.teams;
    }).catch((error) => {
      this.teamsFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @action
  public fetchArticles(): Promise<Article[]> {
    this.articlesFetchState = EntityState.PENDING;
    this.articles = [];
    return this.store.transport.articles(this.id!).then((value) => {
      for (const node of value) {
        this.articles.push(node);
      }
      this.articlesFetchState = EntityState.DONE;
      return this.articles;
    }).catch((error) => {
      this.articlesFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @action
  public fetchAlliances(): Promise<Alliance[]> {
    this.alliancesFetchState = EntityState.PENDING;
    this.alliances = [];
    return this.store.transport.alliances(this.id!).then((value) => {
      for (const node of value) {
        const picks = [];
        if (node.picks) {
          for (const pick of node.picks) {
            picks.push(new Team(pick, stores.team));
          }
        }
        this.alliances.push({
          ...node,
          picks,
          captain: node.captain ? new Team(node.captain, stores.team) : null,
          backup: node.backup ? new Team(node.backup, stores.team) : null,
          backupReplaced:
            node.backupReplaced ? new Team(node.backupReplaced, stores.team) : null,
        });
      }
      this.alliancesFetchState = EntityState.DONE;
      return this.alliances;
    }).catch((error) => {
      this.alliancesFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @action
  public fetchAwards(): Promise<Award[]> {
    this.awardsFetchState = EntityState.PENDING;
    this.awards = [];
    return this.store.transport.awards(this.id!).then((value) => {
      for (const node of value) {
        const recipients = [];
        if (node.recipients) {
          for (const recipient of node.recipients) {
            recipients.push({
              person: recipient.person,
              team: recipient.team ? new Team(recipient.team, stores.team) : null
            });
          }
        }
        this.awards.push({
          ...node,
          recipients
        });
      }
      this.awardsFetchState = EntityState.DONE;
      return this.awards;
    }).catch((error) => {
      this.awardsFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @action
  public fetchRankings(): Promise<Ranking[]> {
    this.rankingsFetchState = EntityState.PENDING;
    this.rankings = [];
    return this.store.transport.rankings(this.id!).then((value) => {
      for (const node of value) {
        this.rankings.push({
          ...node,
          team: new Team(node.team!, stores.team)
        });
      }
      this.rankingsFetchState = EntityState.DONE;
      return this.rankings;
    }).catch((error) => {
      this.rankingsFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @computed get toJS(): IEvent {
    return {
      id: this.id,
      code: this.code,
      address: this.address,
      name: this.name,
      description: this.description,
      district: this.district,
      playoffType: this.playoffType,
      venue: this.venue,
      city: this.city,
      countryCode: this.countryCode,
      timezone: this.timezone,
      week: this.week,
      stateProv: this.stateProv,
      postalCode: this.postalCode,
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      type: this.type,
      website: this.website,
      program: this.program,
      photoUrl: this.photoUrl
    };
  }
}

export const EventFragment = gql`
  fragment EventFragment on Event {
    id
    code
    address
    name
    description
    season {
      id
      name
      program
      startYear
    }
    district
    playoffType
    venue
    city
    countryCode
    country {
      id
      name
      code
    }
    timezone
    week
    stateProv
    postalCode
    dateStart
    dateEnd
    type
    website
    program
    photoUrl(maxWidth: 600)
    location {
      lat
      lon
    }
    placeId
  }
`;
