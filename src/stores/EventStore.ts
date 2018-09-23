import { Store, EntityState } from '../utils/Store';
import { EventTransport } from '../transports/EventTransport';
import { Event } from '../entity/Event';
import { observable, action } from 'mobx';
import { Location, Units } from '../entity/Location';
import { FindArgs } from '../utils/Transport';

export class EventStore extends Store<EventTransport, Event> {
  @observable events: Event[] = [];
  @observable mapEvents: Event[] = [];
  @observable nearbyEvents: Event[] = [];
  @observable loadedAllMapEvents: boolean = false;

  @observable mapEventsFetchState: EntityState = EntityState.PENDING;

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

  @action
  public findNearbyEvents(location: Location, max: number): Promise<Event[]> {
    return this.transport.findByLocation(location, 100, Units.KM, { first: max }).then((value) => {
      const events: Event[] = [];
      for (const edge of value.edges) {
        events.push(new Event(edge.node, this));
      }
      this.nearbyEvents = events.sort((a, b) => {
        return a.distance(location, Units.KM) - b.distance(location, Units.KM);
      });
      return this.nearbyEvents;
    }).catch((error) => {
      throw error;
    });
  }

  @action
  public findByLocation(
    userLocation: Location,
    searchLocation: Location,
    distance: number,
    units: Units,
    args?: FindArgs
  ): Promise<Event[]> {
    this.mapEventsFetchState = EntityState.PENDING;
    return this.transport.findByLocation(searchLocation, distance, units, args).then((value) => {
      const newMapEvents: Event[] = [];
      for (const edge of value.edges) {
        newMapEvents.push(new Event(edge.node, this));
      }
      // Merge new and old results, preventing duplicates
      this.mapEvents = this.mapEvents.concat(
        newMapEvents.filter((newEvent) => {
          return !this.mapEvents.find((oldEvent) => {
            return newEvent.id === oldEvent.id;
          });
        })
      ).sort((a, b) => {
        return a.distance(userLocation, Units.KM) - b.distance(userLocation, Units.KM);
      });
      this.mapEventsFetchState = EntityState.DONE;
      return this.mapEvents;
    }).catch((error) => {
      this.mapEventsFetchState = EntityState.ERROR;
      throw error;
    });
  }
}
