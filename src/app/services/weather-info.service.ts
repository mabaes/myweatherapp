import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';
import { WeatherInfo } from '../models/weather-info';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class WeatherInfoService {
  private key = '7817cbbbb878b080139dd13e07402d21';
  //http://api.openweathermap.org/data/2.5/weather?appid=xxxx&id=yyyy&units=metric
  private url = `http://api.openweathermap.org/data/2.5/weather`;
  private url_forecast =`http://api.openweathermap.org/data/2.5/forecast`;

  constructor(private http: HttpClient) { }
  findCurrentWeather(location: WeatherLocation,
    cb: (err: Error, info: WeatherInfo) => void): void {
    console.log(`findCurrentWeather(${location.name})`);
    ///////////////////////
    this.http.get<any>(this.url, {
      params: { APPID: this.key, units: 'metric', id: location.id.toString() }
    })
      .subscribe(
        (resul) => {
          console.log('[WeatherCurrentWeather] findCurrentWeather() success.');
          if (resul) {
            let info = {
              ts: Date.now(),
              desc: resul.weather[0].description,//'scattered clouds',
              icon: resul.weather[0].icon,
              temp: resul.main.temp, //main.temp
              temp_max: resul.main.temp_max, // main.temp_max
              temp_min: resul.main.temp_min, // main.temp_min
              clouds: resul.clouds.all,
              humidity:  resul.main.humidity,
              pressure:  resul.main.pressure,
              wind: resul.wind.speed,
              dt_txt:resul.dt_txt
            }
            cb(null,info);
          } else {
            cb(null, null);
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );
    ///////////////////////
  }
  /* original
  findCurrentWeather(location: WeatherLocation,
    cb: (err: Error, info: WeatherInfo) => void): void {
    console.log(`findCurrentWeather(${location.name})`);
    let info = {
      ts: Date.now(),
      desc: 'scattered clouds',
      icon: '09d',
      temp: 13, //main.temp
      temp_max: 13, // main.temp_max
      temp_min: 13, // main.temp_min
      clouds: 75, // clouds.all
      humidity: 58, // main.humidity
      pressure: 1005, // main.pressure
      wind: 5.1 // wind.speed
    };    
    cb(null, info);
  }
  */
 
  /* para hacer que hayan varios registros idea mía
  findCurrentWeather(location: WeatherLocation,
    cb: (err: Error, info: WeatherInfo[]) => void): void {
    console.log(`findCurrentWeather(${location.name})`);
    let info: any;
    for (let i = 0; i < 3; i++) {
      info.push({
        ts: Date.now(),
        desc: 'scattered clouds',
        icon: '09d',
        temp: 13, //main.temp
        temp_max: 13, // main.temp_max
        temp_min: 13, // main.temp_min
        clouds: 75, // clouds.all
        humidity: 58, // main.humidity
        pressure: 1005, // main.pressure
        wind: 5.1 // wind.speed
      })
    }
    cb(null, info);
  }
  */
  /* inicial que funciona */
  /*
  findForecast(location: WeatherLocation, ini: number, end: number,
    cb: (err: Error, forecast: WeatherInfo[]) => void): void {
    console.log(`findForecast(${location.name},${ini},${end})`);
    this.findCurrentWeather(location, (err, info) => {
      if (err) cb(err, null);
      else {
        let forecast: WeatherInfo[] = [];
        for (let i = 0; i < 6; i++) forecast.push(info);
        cb(null, forecast);
      }
    });
  }
  */
 
 findForecast(location: WeatherLocation, ini: number, end: number,
  cb: (err: Error, forecast: WeatherInfo[]) => void): void {
  console.log(`findForecast(${location.name},${ini},${end})`);
  this.findCurrentWeather(location, (err, info) => {
    if (err) cb(err, null);
    else {
      //let forecast: WeatherInfo[] = [];
      //for (let i = 0; i < 6; i++) forecast.push(info);
      //cb(null, forecast);
    ///////////////////////
    
    this.http.get<any>(this.url_forecast, {
      params: { APPID: this.key, units: 'metric', id: location.id.toString() }
    })
      .subscribe(
        (resul) => {
          console.log('[WeatherForecast] findForecast() success.');
          console.log(resul);
          if (resul) {
            let forecast: WeatherInfo[] = [];
            for (let item of resul.list) {
              
              let info = {
                ts: item.dt,
                desc: item.weather[0].description,//'scattered clouds',
                icon: item.weather[0].icon,
                temp: item.main.temp, //main.temp
                temp_max: item.main.temp_max, // main.temp_max
                temp_min: item.main.temp_min, // main.temp_min
                clouds: item.clouds.all,
                humidity:  item.main.humidity,
                pressure:  item.main.pressure,
                wind: item.wind.speed,
                dt_txt:item.dt_txt
              }
              
              forecast.push(info);
              
            }
            console.log('fin listado:');
            console.log(forecast);
          
            cb(null,forecast);
          } else {
            cb(null, null);
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );
    ///////////////////////

    } //end else
  });
}



}


