import { Component, OnInit } from '@angular/core';
import { WeatherService, Weather } from '../../services/weather.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherList: Weather[];

  isLoading = false;

  error: string;

  constructor(
    private weatherService: WeatherService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    this.loaderService.loader$.subscribe(loading => this.isLoading = loading);

    this.weatherService.getWeather().subscribe(
      weather => {
        this.weatherList = weather
        this.error = '';
      },
      () => {
        this.error = 'Problem with fetching weather'
        this.weatherList = [];
      }
    )
  }

}
