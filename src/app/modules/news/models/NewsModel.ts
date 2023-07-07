import { ArticleModel } from './ArticleModel';

export interface NewsModel {
  status: string;
  totalResults: number;
  articles: ArticleModel[];
}
