import { Store, EntityState } from '../utils/Store';
import { EventTransport } from '../transports/EventTransport';
import { Event } from '../entity/Event';
import { observable, action } from 'mobx';
import { TeamStore } from './TeamStore';
import { MatchStore } from './MatchStore';

export class EventStore extends Store<EventTransport, Event> {
  @observable events: Event[] = [];

  constructor(transport: EventTransport) {
    super(transport, Event);
  }

  @action
  public findByYearCode(year: number, code: string): Promise<Event> {
    this.fetchState = EntityState.PENDING;
    this.entity = null;
    return this.transport.yearCode(year, code).then((event) => {
      this.entity = new Event(event, this);
      this.fetchState = EntityState.DONE;
      return this.entity;
    }).catch((error) => {
      this.fetchState = EntityState.ERROR;
      throw error;
    });
  }

  @action
  public findByCode(seasonId: string, code: string): Promise<Event> {
    this.fetchState = EntityState.PENDING;
    this.entity = null;
    return this.transport.code(seasonId, code).then((event) => {
      this.entity = new Event(event, this);
      this.fetchState = EntityState.DONE;
      return this.entity;
    }).catch((error) => {
      this.fetchState = EntityState.ERROR;
      throw error;
    });
  }
}
