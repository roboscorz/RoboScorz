import { Node } from '../utils/schema';

export interface Country extends Node {
  name?: string;
  code?: string;
}
