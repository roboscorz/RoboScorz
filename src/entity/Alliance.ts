import { ITeam, Team } from './Team';

export interface Alliance {
  number?: number;
  name?: string;
  captain?: ITeam | Team | null;
  picks?: ITeam[] | Team[] | null;
  backup?: ITeam | Team | null;
  backupReplaced?: ITeam | Team | null;
}
