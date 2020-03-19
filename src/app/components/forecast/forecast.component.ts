import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { StoreService } from '../../services/store.service';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfoService } from '../../services/weather-info.service';
import { WeatherInfo } from '../../models/weather-info';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  private location: WeatherLocation;
  private info: WeatherInfo;
  private milisegundos:number;
  private forecast: WeatherInfo[];
  constructor( private route:ActivatedRoute,
    private locationService: Location,
    private weatherInfoService: WeatherInfoService,
    private store: StoreService
    
    ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    let id:number = Number(this.route.snapshot.paramMap.get('id'));
    this.location = this.store.findLocation(id);   
    this.weatherInfoService.findCurrentWeather(this.location,(err, info) => {
      this.info = info;
    });
    let milisec_start:number = this.info.ts;
    let milisec_end : number = 86400000; //total milisegundos en un dia
    this.weatherInfoService.findForecast(this.location,milisec_start, milisec_end, (err, forecast) => {
      this.forecast= forecast;
    } );
     //console.log(this.forecast);
     this.forecast.forEach((item, index) => {
        console.log('item:'+item.ts); // 1, 2, 3
        console.log(index); // 0, 1, 2
        console.log('<hr/>')
        this.milisegundos = item.ts;
    });
    
    
  }
  back() {
    console.log('[SearchLocationComponent] back()');
    this.locationService.back();
  }

  
}
