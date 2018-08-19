import { computed, observable, action } from 'mobx';
import { Node } from '../utils/schema';
import { Country } from './Country';
import { Season } from './Season';
import { Award } from './Award';
import { Location } from './Location';
import { Entity } from '../utils/Entity';
import { TeamStore } from '../stores/TeamStore';
import gql from 'graphql-tag';
import { EntityState } from '../utils/Store';
import { Event } from './Event';
import stores from '../stores';

export enum Program {
  JFLL = 'JFLL',
  FLL = 'FLL',
  FTC = 'FTC',
  FRC = 'FRC',
  FP = 'FP',
  FIRST = 'FIRST',
  FPTS = 'FPTS'
}

export interface Robot {
  year?: number;
  name?: string;
}

export interface ITeam extends Node {
  program?: Program;
  number?: number;
  name?: string;
  photoUrl?: string;
  sponsors?: string;
  robots?: Robot[];
  city?: string;
  stateProv?: string;
  countryCode?: string;
  country?: Country;
  rookieYear?: number;
  districtCode?: string;
  website?: string;
  season?: Season;
  profileYear?: number;
  location?: Location;
}

export class Team extends Entity<TeamStore> implements ITeam {

  @observable program?: Program;
  @observable number?: number;
  @observable name?: string;
  @observable photoUrl?: string;
  @observable sponsors?: string;
  @observable robots?: Robot[];
  @observable city?: string;
  @observable stateProv?: string;
  @observable countryCode?: string;
  @observable country?: Country;
  @observable rookieYear?: number;
  @observable districtCode?: string;
  @observable website?: string;
  @observable season?: Season;
  @observable profileYear?: number;
  @observable location?: Location;

  @observable awards: Award[] = [];
  @observable events: Event[] = [];

  @observable awardsFetchState: EntityState = EntityState.PENDING;
  @observable eventsFetchState: EntityState = EntityState.PENDING;

  constructor(data: ITeam, store: TeamStore) {
    super(store, data.id, true);
    this.program = data.program;
    this.number = data.number;
    this.name = data.name;
    this.photoUrl = data.photoUrl;
    this.sponsors = data.sponsors;
    this.robots = data.robots;
    this.city = data.city;
    this.stateProv = data.stateProv;
    this.countryCode = data.countryCode;
    this.country = data.country;
    this.rookieYear = data.rookieYear;
    this.districtCode = data.districtCode;
    this.website = data.website;
    this.season = data.season;
    this.profileYear = data.profileYear;
    this.location = data.location;
  }

  @action
  public fetchAwards(): Promise<Award[]> {
    this.awardsFetchState = EntityState.PENDING;
    this.awards = [];
    return this.store.transport.awards(this.id!).then((value) => {
      this.awards = value;
      this.awardsFetchState = EntityState.DONE;
      return this.awards;
    }).catch((error) => {
      this.awardsFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @action
  public fetchEvents(): Promise<Event[]> {
    this.eventsFetchState = EntityState.PENDING;
    this.events = [];
    return this.store.transport.events(this.id!).then((value) => {
      for (const node of value) {
        this.events.push(new Event(node, stores.event));
      }
      this.eventsFetchState = EntityState.DONE;
      return this.events;
    }).catch((error) => {
      this.eventsFetchState = EntityState.ERROR;
      throw error;
    });
  }

  @computed get toJS() {
    return {
      program: this.program,
      number: this.number,
      name: this.name,
      photoUrl: this.photoUrl,
      sponsors: this.sponsors,
      city: this.city,
      stateProv: this.stateProv,
      countryCode: this.countryCode,
      country: this.country,
      rookieYear: this.rookieYear,
      districtCode: this.districtCode,
      website: this.website,
      profileYear: this.profileYear,
      location: this.location
    };
  }

} 

export const TeamFragment = gql`
  fragment TeamFragment on Team {
    id
    program
    number
    name
    photoUrl
    sponsors
    robots {
      year
      name
    }
    season {
      id
      name
      program
      startYear
    }
    country {
      id
      name
      code
    }
    city
    stateProv
    countryCode
    rookieYear
    districtCode
    website
    profileYear
    location {
      lat
      lon
    }
  }
`;
