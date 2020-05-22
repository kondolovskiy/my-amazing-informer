import { Component, OnInit } from '@angular/core';

import { ChuckNorrisService, ChuckNorris } from '../../services/chuck-norris.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  joke: ChuckNorris;

  constructor(
    private chuckNorrisService: ChuckNorrisService
  ) { }

  ngOnInit(): void {
    this.loadJoke();
  }

  oneMore() {
    this.loadJoke();
  }

  private loadJoke() {
    this.chuckNorrisService.getJoke()
      .subscribe(joke => this.joke = joke)
  }

}
