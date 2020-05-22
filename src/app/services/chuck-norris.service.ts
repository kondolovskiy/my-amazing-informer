import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ChuckNorris {
  icon_url: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChuckNorrisService {

  private url = 'https://api.chucknorris.io/jokes/random';

  constructor(
    private http: HttpClient
  ) { }

  getJoke() {
    return this.http.get<ChuckNorris>(this.url)
  }
}
