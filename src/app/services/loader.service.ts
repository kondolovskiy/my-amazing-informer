import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader$ = new Subject<boolean>();

  constructor() { }

  startLoading() {
    this.loader$.next(true);
  }

  isLoaded() {
    this.loader$.next(false);
  }

}
