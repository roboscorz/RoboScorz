/**
 * The base node type.
 */
export interface Node {
  id?: string;
}

/**
 * Defines an edge result.
 */
export interface Edge<T extends Node> {
  node: T;
  cursor: string;
}

/**
 * Defines the page info for a result.
 */
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

/**
 * Defines a connection.
 */
export interface Connection<T extends Node> {
  edges: Edge<T>[];
  totalCount: number;
  pageInfo: PageInfo;
}
