import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {WeatherLocationService} from '../../services/weather-location.service';
import { WeatherLocation } from '../../models/weather-location';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {

  private city: string;
  private locations: WeatherLocation[];
  constructor(private locationService: Location,
    private weatherLocationService: WeatherLocationService,
    private store: StoreService) { }
  back() {
    console.log('[SearchLocationComponent] back()');
    this.locationService.back();
  }

  search() {
    console.log('[SearchLocationComponent] search()');
    this.weatherLocationService.findLocation(this.city, (err, locations) => {
      if (err) console.log('ERROR');
      else {
        this.locations = locations;
      }
    });
  }
  addLocation(location: WeatherLocation) {
    console.log(`[SearchLocationComponent] addLocation(${location.name})`);
    this.store.addLocation(location);
    this.locationService.back();
  }  

  ngOnInit() {
  }

}
