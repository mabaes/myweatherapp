import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { WeatherLocation } from '../../models/weather-location';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public listalocations: WeatherLocation[]=[];
  constructor(private router: Router,private storeService: StoreService) { }

  ngOnInit() {
    this.listalocations = this.storeService.listLocations();
    console.log(`Listado :${this.listalocations}` );
    console.log(this.listalocations.length );
  }

  addLocation() {
    console.log('addLocation()');
    // jump to Search location screen
    this.router.navigateByUrl('/search');
  }
  removeLocation(location: WeatherLocation) {
    console.log(`[DashboardComponent] removeLocation(${location.name})`);
    this.storeService.removeLocation(location.id);
  }

  irMapa(){
    console.log('click map')
    this.router.navigateByUrl('/map');
  }

  
}
