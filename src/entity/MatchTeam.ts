import { ITeam, Team } from './Team';

export enum Side {
  BLUE = 'BLUE',
  RED = 'RED'
}

export interface MatchTeam {
  team?: ITeam | Team;
  side?: Side;
  dq?: boolean;
  details?: any;
  surrogate?: boolean;
}
