import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewsModel } from '../models/NewsModel';

@Injectable()
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Get news from Rest API service
   * @param page Page number
   * @param pageSize Page Size
   */
  getNews(page: number = 1, pageSize: number = 10): Observable<NewsModel> {
    return this.httpClient.get<NewsModel>(
      `${environment.basePath}/everything?q=fashion&language=it&sortBy=publishedAt&page=${page}&pageSize=${pageSize}`
    );
  }
}
