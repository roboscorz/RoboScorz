import { IReactionDisposer, reaction } from 'mobx';
import { Store } from './Store';

/**
 * A representation of an Entity class.
 * @template T The constructed type which inherits the entity class.
 */
export interface EntityClass<T extends Entity<any>> {
  new(data: any, store: any): T;
}

/**
 * The abstract parent class of all entities.
 * @template S The store type.
 */
export abstract class Entity<S extends Store<any, any>> {

  /**
   * The ID of the entity.
   */
  public id?: string;

  /**
   * A reference to the store.
   */
  public store: S;

  /**
   * Are the changes optimistic.
   */
  private optimistic: boolean;

  /**
   * The disposer for the save handler
   */
  private saveHandler?: IReactionDisposer;

  /**
   * Convert a plain JS object into an entity.
   * @param obj The source object.
   */
  public abstract fromJS(obj: any): void;

  /**
   * Convert the entity to a plain JS object.
   */
  public abstract get toJS(): any;

  /**
   * Create an instance of Entity.
   * @param store A reference to the store.
   * @param id The ID of the Entity.
   * @param autoSave Should the object auto save.
   * @param optimistic Are the changes optimistic.
   */
  constructor(store: S, id?: string, optimistic: boolean = true) {
    this.id = id;
    this.store = store;
    this.optimistic = optimistic;
  }

  protected autoSave() {
    this.saveHandler = reaction(() => this.toJS, () => {
      this.store.save(this, this.optimistic);
    });
  }

  /**
   * Dispose of the entity.
   */
  public dispose() {
    if (this.saveHandler) this.saveHandler();
  }
}
