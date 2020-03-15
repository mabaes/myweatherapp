import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfoService } from '../../services/weather-info.service';
import { WeatherInfo } from '../../models/weather-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input()
  private location: WeatherLocation;
  @Output()
  private removed = new EventEmitter();
  constructor(private weatherInfoService: WeatherInfoService, private router: Router) { }
  private info: WeatherInfo;

  refresh() {
    console.log('[WeatherCardComponent] refresh()');
    
    this.weatherInfoService.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
    });    
  }

  remove() {
    console.log('[WeatherCardComponent] remove()');
    this.removed.emit(this.location);
  }

  showDetails() {
    console.log('[WeatherCardComponent] showDetails()');
    this.router.navigateByUrl(`/details/${this.location.id}`);
  }
  showForecast() {
    console.log('[WeatherCardComponent] showForecast()');
    this.router.navigateByUrl(`/forecast/${this.location.id}`);
  }

  ngOnInit() {
    /*
    console.log('[WeatherCardComponent] ngOnInit()');
    this.weatherInfoService.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
    });
    */
    console.log('[WeatherCardComponent] ngOnInit()');
    this.refresh();
  }

}
