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
  private contador: number = 0;
  public example: any;
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
      let milisec_start: number = 1584705600;//this.info.ts;
      let milisec_end: number = 1584792000;//86400000; //total milisegundos en un dia

      this.milisegundos = milisec_end;
      console.log(milisec_start);
      //for (let i = 0; i < 6; i++) {
      //https://stackoverflow.com/questions/47642517/ngfor-group-by-key-and-display-key-for-each-group
      //https://stackoverflow.com/questions/37248580/how-to-group-data-in-angular-2
      this.weatherInfoService.findForecast(this.location, milisec_start, milisec_end, (err, forecast) => {
        this.forecast = forecast;
        //console.log('datos forecast');
        //console.log(forecast);
        //////////////////////////////////////////
        const source = from(forecast);
        //group by date
        this.example = source.pipe(
          groupBy(forecast => this.datepipe.transform(forecast.dt_txt, 'dd/MM/yyyy')),
          // return each item in group as array
          mergeMap(group => group.pipe(toArray())),
          toArray()
        );

        //let subscribe = this.example.subscribe(val => console.log(val));
        //let subscribe = this.example.subscribe(val=>val);
        this.resul_group = this.example.subscribe(
          val => {
            //console.log(val);
            this.forecast_groupby = val;            
          }

        );
        if (this.forecast_groupby) {
          console.log('resultado de agrupar:')
          console.log(this.forecast_groupby);
        }
        //let subscribe = example.subscribe(val => console.log(val));
        //console.log('SUSCRIBIR OUT:');
        //console.log(this.example2);

        //////////////////////////////////////////
      });
      //  this.contador ++; 
      //}
    }); //end findcurrentWeather



  } //ngOnInit
  /*
      ngOnInit() {
      console.log(this.route.snapshot.paramMap.get('id'));
      let id:number = Number(this.route.snapshot.paramMap.get('id'));
      this.location = this.store.findLocation(id);   
      this.weatherInfoService.findCurrentWeather(this.location,(err, info) => {
        this.info = info;
      });
      let milisec_start:number = this.info.ts;
      let milisec_end : number = 86400000; //total milisegundos en un dia
      this.weatherInfoService.findForecast(this.location,milisec_start, milisec_end, (err, forecast) => {
        this.forecast= forecast;
      } );
       //console.log(this.forecast);
       this.forecast.forEach((item, index) => {
          console.log('item:'+item.ts); // 1, 2, 3
          console.log(index); // 0, 1, 2
          console.log('<hr/>')
          this.milisegundos = item.ts;
      });
      
      
    }
    */
  back() {
    console.log('[SearchLocationComponent] back()');
    this.locationService.back();
  }


}
