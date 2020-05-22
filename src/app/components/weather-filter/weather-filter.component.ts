import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather-filter',
  templateUrl: './weather-filter.component.html',
  styleUrls: ['./weather-filter.component.scss']
})
export class WeatherFilterComponent implements OnInit {
  @Output() onDateFilter = new EventEmitter<number>();

  @Output() onResetFilter = new EventEmitter<boolean>();

  @Input() min: string;

  @Input() max: string;

  filtersForm= new FormGroup({
    date: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  dateFilter(dateNumber: number) {
    this.onDateFilter.emit(dateNumber);
  }

  resetFilter() {
    this.filtersForm.reset();
    this.onResetFilter.emit(true);
  }

}
