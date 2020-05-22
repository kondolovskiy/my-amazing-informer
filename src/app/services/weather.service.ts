import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';

export interface Weather {
  dt: number;
  dt_txt: string;
  main: {
    temp: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
    private loader: LoaderService
  ) { }

  getWeather(): Observable<Weather[]> {
    const { url, units, lat, lon, appid } = environment.weather;

    const params = new HttpParams()
      .set('lat', String(lat))
      .set('lon', String(lon))
      .set('units', units)
      .set('appid', appid);

    this.loader.startLoading()

    return this.http.get(url, { params }).pipe(
      tap(() => this.loader.isLoaded()),
      pluck('list')
    );
  }
}
