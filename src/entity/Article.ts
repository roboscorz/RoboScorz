import { Node } from '../utils/schema';

export interface Article extends Node {
  featured?: boolean;
  title?: string;
  tags?: string[];
  description?: string;
  photoUrl?: string;
  url?: string;
  data?: string;
}
