import { Store } from '../utils/Store';
import { UserTransport } from '../transports/UserTransport';
import { User } from '../entity/User';

export class UserStore extends Store<UserTransport, User> {

  constructor(transport: UserTransport) {
    super(transport, User);
  }
}
