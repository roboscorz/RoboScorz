import client from '../client';
import { UserStore } from './UserStore';
import { UserTransport } from '../transports/UserTransport';
import { AuthStore } from './AuthStore';
import { EventStore } from './EventStore';
import { EventTransport } from '../transports/EventTransport';
import { TeamStore } from './TeamStore';
import { TeamTransport } from '../transports/TeamTransport';
import { MatchStore } from './MatchStore';
import { MatchTransport } from '../transports/MatchTransport';

const stores = {
  user: new UserStore(new UserTransport(client)),
  auth: new AuthStore(client),
  event: new EventStore(new EventTransport(client)),
  team: new TeamStore(new TeamTransport(client)),
  match: new MatchStore(new MatchTransport(client))
};

export default stores;
