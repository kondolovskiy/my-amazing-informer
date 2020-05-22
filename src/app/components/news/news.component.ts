import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NewsService, Article, Country } from '../../services/news.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: Article[];

  error: string;

  defaultCountry: Country = 'ua';

  isLoading = true;

  countriesList = [
    { code: 'ua', name: 'Ukraine' },
    { code: 'us', name: 'USA' },
    { code: 'de', name: 'Germany' }
  ]

  countryForm = new FormGroup({
    country: new FormControl(this.defaultCountry)
  })

  constructor(
    private newsService: NewsService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    this.loaderService.loader$.subscribe(loading => this.isLoading = loading);

    this.fetchNews(this.defaultCountry);
  }

  changeCountry() {
    const { country } = this.countryForm.value;

    this.fetchNews(country);
  }

  get countryName() {
    const { country } = this.countryForm.value;

    return this.countriesList
                .filter(c => c.code === country)
                .map(v => v.name)
                .shift();
  }

  private fetchNews(country: Country) {
    this.newsService.getNewsList(country).subscribe(
      news => {
        this.news = news;
        this.error = '';
      },
      () => {
        this.news = [];
        this.error = 'News cannot be loaded'
      }
    );
  }

}
