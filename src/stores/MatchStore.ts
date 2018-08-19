import { Store } from '../utils/Store';
import { MatchTransport } from '../transports/MatchTransport';
import { Match } from '../entity/Match';
import { observable } from 'mobx';
import { TeamStore } from './TeamStore';

export class MatchStore extends Store<MatchTransport, Match> {
  @observable matches: Match[] = [];

  constructor(transport: MatchTransport) {
    super(transport, Match);
  }
}
