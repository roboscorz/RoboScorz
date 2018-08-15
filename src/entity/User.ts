import { observable, computed } from 'mobx';
import { Entity } from '../utils/Entity';
import { UserStore } from '../stores/UserStore';
import { Node } from '../utils/schema';

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl?: string;
}

export interface IUser extends Node {
  firstName?: string;
  lastName?: string;
  email?: string;
  photoUrl?: string;
  provider?: string;
  providerId?: string;
}

export class User extends Entity<UserStore> implements IUser {
  @observable firstName?: string;
  @observable lastName?: string;
  @observable email?: string;
  @observable photoUrl?: string;
  provider?: string;
  providerId?: string;

  constructor(data: IUser, store: UserStore) {
    super(store, data.id, true);
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.provider = data.provider;
    this.photoUrl = data.photoUrl;
    this.providerId = data.providerId;
  }

  @computed get toJS(): IUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      photoUrl: this.photoUrl,
      provider: this.provider,
      providerId: this.providerId
    };
  }

  fromJS(data: IUser) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.provider = data.provider;
    this.photoUrl = data.photoUrl;
    this.providerId = data.providerId;
  }
}
