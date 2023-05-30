export interface PostSearchBody {
  pmid: string;
  title: string;
  authors: string[];
  affiliations: string[];
  journal_title: string;
  place_of_publication: string;
  abstract: string;
  keyword: string[];
  article_identifier: string;
}
