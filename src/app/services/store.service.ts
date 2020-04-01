import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private locations: WeatherLocation[] = [];
  constructor() {
    
   if (localStorage.getItem('locations'))
    this.locations = JSON.parse(localStorage.getItem('locations'));
  }
  addLocation(location: WeatherLocation): boolean {
    console.log(`[StoreService] addLocation(${location.name}`);
    let id_location = location.id;
    let index = this.locations.findIndex((location => location.id === id_location));
    let addlocation : boolean = false;
    console.log(`REsultado de buscar si esta la cieudad ${index}`);
    if (index == -1) {
      console.log('add la ciudad');
      this.locations.push(location);
      localStorage.setItem('locations', JSON.stringify(this.locations));
      addlocation = true;
    }
    return addlocation;
  }
  removeLocation(id: number): void {
    console.log(`[StoreService] removeLocation(${id})`);
    let index = this.locations.findIndex((location => location.id === id));
    if (index !== -1) this.locations.splice(index, 1);
    localStorage.setItem('locations', JSON.stringify(this.locations));
  }
  listLocations(): WeatherLocation[] {
    console.log(`[StoreService] listLocation()`);
    return this.locations;
  }
  findLocation(id: number): WeatherLocation {
    console.log(`[StoreService] findLocation(${id})`);
    let index = this.locations.findIndex((location => location.id === id));
    if (index !== -1) return this.locations[index];
    else return null;
  }
}
