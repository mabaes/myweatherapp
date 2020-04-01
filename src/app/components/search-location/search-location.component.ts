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
  private encontrado : boolean;
  private loading:boolean = false;  
  private msg:string='';
  constructor(private locationService: Location,
    private weatherLocationService: WeatherLocationService,
    private store: StoreService) { }
  back() {
    console.log('[SearchLocationComponent] back()');
    this.locationService.back();
  }

  search() {
    console.log('[SearchLocationComponent] search()');
    this.loading = true;
    this.weatherLocationService.findLocation(this.city, (err, locations) => {
      this.loading = false;
      if (err) {
        console.log('ERROR');
        this.encontrado=false;
        this.msg="Lo sentimos pero no hemos encotrado la ciudad indicada. Verifique que está correctamente escrita";

      }
      else {
        this.encontrado=true;
        this.locations = locations;
      }
    });
  }
  addLocation(location: WeatherLocation) {
    console.log(`[SearchLocationComponent] addLocation(${location.name})`);
    let resultado = this.store.addLocation(location);
    console.log(`Resultado de Add ${resultado}`);
    if (resultado) {
      this.locationService.back();
    } else {
      this.encontrado = false;
      this.msg ="La ciudad que ha buscado ya estaba en su lista de favoritos.";
    }
  }  

  ngOnInit() {
  }

}
