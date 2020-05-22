import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { WeatherService, Weather } from '../../services/weather.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherList: Weather[];

  filteredList: Weather[];

  isLoading = false;

  error: string;

  min = this.getMinDate();

  max = this.getMaxDate();

  constructor(
    private weatherService: WeatherService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    this.loaderService.loader$.subscribe(loading => this.isLoading = loading);

    this.weatherService.getWeather().subscribe(
      weather => {
        this.weatherList = weather
        this.filteredList = weather
        this.error = '';
      },
      () => {
        this.error = 'Problem with fetching weather'
        this.weatherList = [];
        this.filteredList = [];
      }
    )
  }

  dateFilter(dateNumber: number) {
    const tomorrow = new Date(dateNumber);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date(dateNumber);

    const timeTomorrow = tomorrow.getTime() / 1000;
    const timeYesterday = yesterday.getTime() / 1000;

    this.filteredList = this.weatherList.filter(weather => weather.dt >= timeYesterday && weather.dt < timeTomorrow)
  }

  resetFilter() {
    this.filteredList = this.weatherList;
  }

  private getMinDate() {
    return Date.now();
  }

  private getMaxDate() {
    const date = new Date();
    date.setDate(date.getDate() + 5);

    return date.getTime();
  }
    

}
