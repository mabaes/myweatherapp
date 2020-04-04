import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfoService } from '../../services/weather-info.service';
import { StoreService } from '../../services/store.service';
import { WeatherInfo } from '../../models/weather-info';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  
  
  constructor(private locationService: Location,
      private route:ActivatedRoute,
      private weatherInfoService: WeatherInfoService,
      private store: StoreService
    ) { }
  
  private location: WeatherLocation;  
  private info: WeatherInfo;
  back() {
    console.log('[SearchLocationComponent] back()');
    this.locationService.back();
  }

  refresh() {
    this.info=undefined;
    console.log('[WeatherCardComponent] refresh()');    
    
    this.weatherInfoService.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
    });    
  }

  ngOnInit() {
    console.log('id a consultar:'+ this.route.snapshot.paramMap.get('id'));
    let id:number = Number(this.route.snapshot.paramMap.get('id'));
    this.location = this.store.findLocation(id);    
    //console.log(this.store.findLocation(id));
    this.weatherInfoService.findCurrentWeather(this.location,(err, info) => {
      this.info = info;
    });      
  }

}
