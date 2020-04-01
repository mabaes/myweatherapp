import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfoService } from '../../services/weather-info.service';
import { WeatherInfo } from '../../models/weather-info';


// RxJS v6+
import { from, Subscription } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  private location: WeatherLocation;
  private info: WeatherInfo;
  private milisegundos: number;
  private milisegundos_fin: number;
  private forecast: WeatherInfo[];
  public group: any;
  public forecast_groupby: any;
  private resul_group: Subscription;

  constructor(private route: ActivatedRoute,
    private locationService: Location,
    private weatherInfoService: WeatherInfoService,
    private store: StoreService,
    public datepipe: DatePipe,


  ) { }
  ngOnInit() {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.location = this.store.findLocation(id);

    this.weatherInfoService.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
      let milisec_start: number = this.info.ts;
      let milisec_end: number = 1584792000;//total milisegundos en un dia
      this.milisegundos = milisec_end;
      this.weatherInfoService.findForecast(this.location, milisec_start, milisec_end, (err, forecast) => {
        this.forecast = forecast;
        ///////////////// agrupamos el array por fechas /////////////////////////
        const source = from(forecast);
        //group by date
        this.group = source.pipe(
          groupBy(forecast => this.datepipe.transform(forecast.dt_txt, 'dd/MM/yyyy')),
          // return each item in group as array
          mergeMap(group => group.pipe(toArray())),
          toArray()
        );
        this.resul_group = this.group.subscribe(
          val => {
            //console.log(val);
            this.forecast_groupby = val;            
          }

        );        
        //////////////////////////////////////////
      });
      
    }); //end findcurrentWeather

  } //ngOnInit
  
  back() {
    console.log('[SearchLocationComponent] back()');
    this.locationService.back();
  }


}
