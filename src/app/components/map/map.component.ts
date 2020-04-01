import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { WeatherInfo } from '../../models/weather-info';
import { WeatherLocationService } from 'src/app/services/weather-location.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map;
  private popup:any;
  private infoLongLat : WeatherInfo;

  constructor(private infoService: WeatherLocationService, private location: Location) { }
  
  back() {   
    this.location.back();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.44, -0.37 ],
      zoom: 3
    });
    const tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 22,
      attribution: '&copy; <a href="http://osm.org/copyright" target = "_blank">OpenStreetMap</a> contributors'
    });
    tiles.addTo(this.map);
    this.map.on("click", e => this.onMapClick(e));
    

    /////nuevo /////
    this.popup = L.popup();
  }
  onMapClick(e):void {
    console.log('map click');
    console.log(e);    
    /*
    this.popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString()) //esample from leaflet, will be immediately replaced by weatherpopup...
        .openOn(this.map);
    */     
        this.infoService.findByLongLat(e.latlng.lng, e.latlng.lat, (err, info) => {
          this.infoLongLat=info;
          console.log('resul long lat');
          console.log(this.infoLongLat);
          this.popup
            .setLatLng(e.latlng)
            .setContent(
              "<b>" + this.infoLongLat.name +"</b><br/>" +
              e.latlng.toString() +
              "<img src='http://openweathermap.org/img/w/" + this.infoLongLat.icon + ".png'><br/>" +
              "Temp.: " + this.infoLongLat.temp + "°C<br/>Pressure: " + this.infoLongLat.pressure +"hPa <br/>" +
              "Humidity: " + this.infoLongLat.humidity + "%" + "<br>Clouds: " + this.infoLongLat.clouds + "% <br/>" +
              "Wind: " + this.infoLongLat.wind  
              
            ) //set content
            .openOn(this.map);

        });
  
  }

  
}





