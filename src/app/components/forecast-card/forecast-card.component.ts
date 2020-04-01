import { Component, OnInit, Input } from '@angular/core';
import { WeatherInfo } from '../../models/weather-info';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css']
})
export class ForecastCardComponent implements OnInit {
  @Input()  item_forecast: WeatherInfo[];
  constructor() { }

  ngOnInit() {
    //console.log('Forecast-card:');
    //console.log(this.item_forecast);
  }

}
