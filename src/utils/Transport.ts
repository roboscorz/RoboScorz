import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Node, Connection } from './schema';

export interface FindArgs {
  first?: number;
  after?: string;
  filter?: any;
  orderBy?: any[];
  dateRange?: any;
}

/**
 * The abstract parent class of all transports.
 */
export abstract class Transport {
  
  /**
   * A reference to the apollo client.
   */
  protected client: ApolloClient<NormalizedCacheObject>;

  /**
   * Create an instance of Transport.
   * @param client A reference to the apollo client.
   */
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  /**
   * Create a node.
   * @param data The source data.
   */
  public abstract create(data: any): Promise<Node>;

  /**
   * Remove a node.
   * @param id The node id to remove.
   */
  public abstract remove(id: string): Promise<Node>;

  /**
   * Mutate a node.
   * @param data The data to update.
   */
  public abstract mutate(data: Node): Promise<Node>;

  /**
   * Fetch a node.
   * @param id The node id to fetch.
   */
  public abstract node(id: string): Promise<Node>;

  /**
   * Run a find query.
   * @param first How many edges to find.
   * @param after A cursor to find edges after.
   * @param filter A filter.
   * @param orderBy Orders for the results.
   */
  public abstract find(args: FindArgs): Promise<Connection<Node>>;
}
