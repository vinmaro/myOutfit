import { SourceModel } from './Source';

export interface ArticleModel {
  source: SourceModel;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}
