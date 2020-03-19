import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';
import { HttpClient } from '@angular/common/http';
//import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root'
})

export class WeatherLocationService {
  private key = '7817cbbbb878b080139dd13e07402d21';
  private url = `http://api.openweathermap.org/data/2.5/weather`;
  constructor(private http: HttpClient) { }
  /* INICIAL lo sustituimos por llamada a la api*/
  /*
  findLocation(desc: string,
    cb: (err: Error, locations: WeatherLocation[]) => void): void {
    console.log(`[WeatherLocationService] findLocation(${desc}`);
    let location = {
      id: 100,
      lat: 38.71,
      lon: -0.47,
      name: 'Alcoy',
      country: 'ES'
    };
    cb(null, [location]);
  }
  */

  findLocation(desc: string,
    cb: (err: Error, locations: WeatherLocation[]) => void): void {
    console.log(`[WeatherLocationService] findLocation(${desc})`);
    this.http.get<any>(this.url, {
      params: { APPID: this.key, q: desc }
    })
      .subscribe(
        (info) => {
          console.log('[WeatherLocationService] findLocation() success.');
          console.log(info);
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

    
}
  
