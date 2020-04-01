import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';
import { HttpClient } from '@angular/common/http';
import { WeatherInfo } from '../models/weather-info';
//import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root'
})

export class WeatherLocationService {
  private key = '7817cbbbb878b080139dd13e07402d21';
  private url = `http://api.openweathermap.org/data/2.5/weather`;  
  constructor(private http: HttpClient) { } 

  findLocation(desc: string,
    cb: (err: Error, locations: WeatherLocation[]) => void): void {
    console.log(`[WeatherLocationService] findLocation(${desc})`);
    this.http.get<any>(this.url, {
      params: { APPID: this.key, q: desc }
    })
      .subscribe(
        (info) => {
          console.log('[WeatherLocationService] findLocation() success.');
          if (info) {
            cb(null, [{
              id: info.id,
              lat: info.coord.lat,
              lon: info.coord.lon,
              name: info.name,
              country: info.sys.country
            }]);
          } else {
            cb(null, []);
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );
  }

  //// nuevo  encontrar localizacion los lon / lat/////
  findByLongLat(longi: string, lati:string,
    cb: (err: Error, info: WeatherInfo) => void): void {
    console.log(`[WeatherLocationService] findByLongLat(${longi})(${lati})`);
    this.http.get<any>(this.url, {
      params: { APPID: this.key, lat:lati.toString(), lon: longi.toString(),units: 'metric'   }
    })
      .subscribe(
        (info) => {
          console.log('[WeatherLocationService] findByLongLat() success. ');
          console.log(info);
          if (info) {
            cb(null, {
              ts: Date.now(),
              desc: info.weather[0].description,//'scattered clouds',
              icon: info.weather[0].icon,
              temp: info.main.temp, 
              temp_max: info.main.temp_max, 
              temp_min: info.main.temp_min, 
              clouds: info.clouds.all,
              humidity: info.main.humidity,
              pressure: info.main.pressure,
              wind: info.wind.speed,
              dt_txt: info.dt_txt,
              name:info.name

            });
          } else {
            cb(null, null);
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );
  }
    
}
  
