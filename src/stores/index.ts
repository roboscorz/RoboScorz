import client from '../client';
import { UserStore } from './UserStore';
import { UserTransport } from '../transports/UserTransport';
import { AuthStore } from './AuthStore';

const userStore = new UserStore(new UserTransport(client));
const authStore = new AuthStore(client, userStore);

const stores = {
  user: userStore,
  auth: authStore
};

export default stores;
