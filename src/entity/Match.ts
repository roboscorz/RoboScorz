import { Node } from '../utils/schema';
import { Side, MatchTeam } from './MatchTeam';
import { Video } from './Video';
import { observable, action, computed } from 'mobx';
import { EntityState } from '../utils/Store';
import { MatchStore } from '../stores/MatchStore';
import { Entity } from '../utils/Entity';
import { Team } from './Team';
import gql from 'graphql-tag';
import stores from '../stores';

export enum MatchLevel {
  EF = 'EF',
  QM = 'QM',
  QF = 'QF',
  SF = 'SF',
  F = 'F'
}

export interface IMatch extends Node {
  number?: number;
  setNumber?: number;
  level?: MatchLevel;
  actualStartTime?: string;
  postResultTime?: string;
  description?: string;
  scoreRedTeleop?: number;
  scoreRedFoul?: number;
  scoreRedAuto?: number;
  scoreRedAutoBonus?: number;
  scoreRedEnd?: number;
  scoreRedTotal?: number;
  scoreBlueTeleop?: number;
  scoreBlueFoul?: number;
  scoreBlueAuto?: number;
  scoreBlueAutoBonus?: number;
  scoreBlueEnd?: number;
  scoreBlueTotal?: number;
  winner?: Side;
  details?: any;
}

export class Match extends Entity<MatchStore> implements IMatch {
  @observable number?: number;
  @observable setNumber?: number;
  @observable level?: MatchLevel;
  @observable actualStartTime?: string;
  @observable postResultTime?: string;
  @observable description?: string;
  @observable scoreRedTeleop?: number;
  @observable scoreRedFoul?: number;
  @observable scoreRedAuto?: number;
  @observable scoreRedAutoBonus?: number;
  @observable scoreRedEnd?: number;
  @observable scoreRedTotal?: number;
  @observable scoreBlueTeleop?: number;
  @observable scoreBlueFoul?: number;
  @observable scoreBlueAuto?: number;
  @observable scoreBlueAutoBonus?: number;
  @observable scoreBlueEnd?: number;
  @observable scoreBlueTotal?: number;
  @observable winner?: Side;
  @observable details?: any;
  
  @observable teams: MatchTeam[] = [];
  @observable videos: Video[] = [];

  @observable teamsFetchState: EntityState = EntityState.PENDING; 
  @observable videosFetchState: EntityState = EntityState.PENDING; 

  constructor(data: IMatch, store: MatchStore) {
    super(store, data.id, true);
    this.id = data.id;
    this.number = data.number;
    this.setNumber = data.setNumber;
    this.level = data.level;
    this.actualStartTime = data.actualStartTime;
    this.postResultTime = data.postResultTime;
    this.description = data.description;
    this.scoreRedTeleop = data.scoreRedTeleop;
    this.scoreRedFoul = data.scoreRedFoul;
    this.scoreRedAuto = data.scoreRedAuto;
    this.scoreRedAutoBonus = data.scoreRedAutoBonus;
    this.scoreRedEnd = data.scoreRedEnd;
    this.scoreRedTotal = data.scoreRedTotal;
    this.scoreBlueTeleop = data.scoreBlueTeleop;
    this.scoreBlueFoul = data.scoreBlueFoul;
    this.scoreBlueAuto = data.scoreBlueAuto;
    this.scoreBlueAutoBonus = data.scoreBlueAutoBonus;
    this.scoreBlueEnd = data.scoreBlueEnd;
    this.scoreBlueTotal = data.scoreBlueTotal;
    this.winner = data.winner;
    this.details = data.details;
  }

  @computed get toJS() {
    return {
      id: this.id,
      number: this.number,
      setNumber: this.setNumber,
      level: this.level,
      actualStartTime: this.actualStartTime,
      postResultTime: this.postResultTime,
      description: this.description,
      scoreRedTeleop: this.scoreRedTeleop,
      scoreRedFoul: this.scoreRedFoul,
      scoreRedAuto: this.scoreRedAuto,
      scoreRedAutoBonus: this.scoreRedAutoBonus,
      scoreRedEnd: this.scoreRedEnd,
      scoreRedTotal: this.scoreRedTotal,
      scoreBlueTeleop: this.scoreBlueTeleop,
      scoreBlueFoul: this.scoreBlueFoul,
      scoreBlueAuto: this.scoreBlueAuto,
      scoreBlueAutoBonus: this.scoreBlueAutoBonus,
      scoreBlueEnd: this.scoreBlueEnd,
      scoreBlueTotal: this.scoreBlueTotal,
      winner: this.winner,
      details: this.details
    };
  }

  @action
  public fetchTeams(): Promise<MatchTeam[]> {
    this.teamsFetchState = EntityState.PENDING;
    this.teams = [];
    return this.store.transport.teams(this.id!).then((matchTeams) => {
      for (const team of matchTeams) {
        this.teams.push({
          ...team,
          team: new Team(team.team!, stores.team)
        });
      }
      this.teamsFetchState = EntityState.DONE;
      return this.teams;
    }).catch((error) => {
      this.teamsFetchState = EntityState.ERROR;
      throw error;
    });
  }
}

export const MatchFragment = gql`
  fragment MatchFragment on Match {
    id
    number
    setNumber
    level
    actualStartTime
    postResultTime
    description
    scoreRedTeleop
    scoreRedFoul
    scoreRedAuto
    scoreRedAutoBonus
    scoreRedEnd
    scoreRedTotal
    scoreBlueTeleop
    scoreBlueFoul
    scoreBlueAuto
    scoreBlueAutoBonus
    scoreBlueEnd
    scoreBlueTotal
    winner
  }
`;
