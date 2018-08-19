import { ITeam, Team } from './Team';

export interface Ranking {
  rank?: number;
  dq?: number;
  matchesPlayed?: number;
  rankingPoints?: number;
  qualifyingPoints?: number;
  losses?: number;
  wins?: number;
  ties?: number;
  team?: ITeam | Team;
}
