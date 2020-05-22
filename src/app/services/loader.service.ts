import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader$ = new BehaviorSubject(true);

  constructor() { }

  startLoading() {
    this.loader$.next(true);
  }

  isLoaded() {
    this.loader$.next(false);
  }

}
