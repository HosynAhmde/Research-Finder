import { PostSearchBody } from './doc-body.interfce';

export interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}
