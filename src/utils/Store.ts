import { Transport } from '../utils/Transport';
import { Entity, EntityClass } from './Entity';
import { action, observable } from 'mobx';

/**
 * Represents the loading state of an entity.
 */
export enum EntityState {
  PENDING,
  ERROR,
  DONE
}

/**
 * The abstract parent class of all stores.
 * @template T The transport type.
 * @template E The entity type.
 */
export abstract class Store<T extends Transport, E extends Entity<any>> {
  
  /**
   * The transport for the store.
   */
  public transport: T;

  /**
   * The entity class.
   */
  protected entityClass: EntityClass<E>;

  /**
   * The most recently fetched entity.
   */
  @observable entity: E | null = null;

  /**
   * The fetch state of the entity.
   */
  @observable fetchState: EntityState = EntityState.DONE;

  /**
   * The creation state of the entity.
   */
  @observable createState: EntityState = EntityState.DONE;

  /**
   * The removal state of the entity.
   */
  @observable removeState: EntityState = EntityState.DONE;

  /**
   * The save state of the entity.
   */
  @observable saveState: EntityState = EntityState.DONE;

  /**
   * Create an instance of Store.
   * @param transport The transport.
   * @param entity The entity class.
   */
  constructor(transport: T, entity: EntityClass<E>) {
    this.transport = transport;
    this.entityClass = entity;
  }

  /**
   * Find an entity by ID.
   * @param id The ID of the entity.
   */
  @action
  public findById(id: string): Promise<E> {
    this.fetchState = EntityState.PENDING;
    this.entity = null;
    return this.transport.node(id).then((node) => {
      const entity = new this.entityClass(node, this);
      this.entity = entity;
      return entity;
    }).catch((error) => {
      this.fetchState = EntityState.ERROR;
      throw error;
    });
  }

  /**
   * Create an entity.
   * @param entity The entity to create.
   */
  @action
  public create(entity: E): Promise<E> {
    this.createState = EntityState.PENDING;
    return this.transport.create(entity.toJS).then((node) => {
      this.createState = EntityState.DONE;
      return new this.entityClass(node, this);
    }).catch((error) => {
      this.createState = EntityState.ERROR;
      throw error;
    });
  }

  /**
   * Remove an entity.
   * @param id The ID of the entity.
   */
  @action
  public remove(id: string): Promise<E> {
    this.removeState = EntityState.PENDING;
    return this.transport.remove(id).then((node) => {
      this.removeState = EntityState.DONE;
      return new this.entityClass(node, this);
    }).catch((error) => {
      this.removeState = EntityState.ERROR;
      throw error;
    });
  }

  /**
   * Triggers before a save occurs.
   * @param entity The entity that will be saved.
   * @param optimistic Should the entity update optimisticly.
   */
  @action
  protected beforeSave(entity: E, optimistic: boolean) {
    if (this.entity && optimistic) {
      if (this.entity.id === entity.id) this.entity = entity;
    }
  }

  /**
   * Triggers after a save occurs.
   * @param entity The entity that has been saved.
   */
  @action
  protected afterSave(entity: E) {
    if (this.entity) {
      if (this.entity.id === entity.id) this.entity = entity;
    }
  }

  /**
   * Save an entity.
   * @param entity The entity to save.
   * @param optimistic Should the entity update optimistically.
   */
  @action
  public save(entity: E, optimistic: boolean = false): Promise<E> {
    this.saveState = EntityState.PENDING;
    this.beforeSave(entity, optimistic);
    return this.transport.mutate(entity.toJS).then((node) => {
      this.saveState = EntityState.DONE;
      const savedEntity = new this.entityClass(node, this);
      this.afterSave(savedEntity);
      return savedEntity;
    }).catch((error) => {
      this.saveState = EntityState.ERROR;
      throw error;
    });
  }
}
