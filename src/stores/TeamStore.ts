import { Store } from '../utils/Store';
import { TeamTransport } from '../transports/TeamTransport';
import { Team } from '../entity/Team';
import { observable } from 'mobx';
import { EventStore } from './EventStore';

export class TeamStore extends Store<TeamTransport, Team> {
  @observable teams: Team[] = [];

  constructor(transport: TeamTransport) {
    super(transport, Team);
  }
}
