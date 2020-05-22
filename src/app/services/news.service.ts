import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { pluck, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';

export type Country = 'ua' | 'us' | 'de';

export interface Article {
  title: string;
  url: string;
  urlToImage: string;
  description: string;
  author: string;
  source: {
    name: string;
  };
}

interface NewsApiResponse {
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url: string;
  private apiKey: string;
  private pageSize = 10;

  constructor(
    private http: HttpClient,
    private loader: LoaderService
  ) { 
    this.url = environment.news.url;
    this.apiKey = environment.news.apiKey;
  }

  getNewsList(country: Country = 'ua') {
    const params = new HttpParams()
        .set('country', country)
        .set('pageSize', String(this.pageSize));

    const headers = new HttpHeaders()
                        .set('X-Api-Key', this.apiKey);

    this.loader.startLoading();

    return this.http.get<NewsApiResponse>(this.url, { 
      params, 
      headers 
    })
      .pipe(
        tap(() => this.loader.isLoaded()),
        pluck('articles'),
        catchError((error) => {
          this.loader.isLoaded();
          return throwError(error);
        })
      );
  }
}
