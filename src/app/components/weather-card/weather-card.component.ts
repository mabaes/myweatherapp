import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfoService } from '../../services/weather-info.service';
import { WeatherInfo } from '../../models/weather-info';
import { Router } from '@angular/router';


////historial ////////
import { interval } from 'rxjs';
import { HistoricalInfo } from 'src/app/models/historical-info';


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input()
  private location: WeatherLocation;
  @Output()
  private removed = new EventEmitter();
  constructor(private weatherInfoService: WeatherInfoService, private router: Router) { }
  private info: WeatherInfo;

  ///////////// historical ///////////////  
  private datosHistorico : HistoricalInfo  = {};  
  private arr: HistoricalInfo  = {};
  /////////// fin historical ///////////

  refresh() {
    console.log('[WeatherCardComponent] refresh()');
    this.info=undefined;
    this.weatherInfoService.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
      // guardamos en histórico
      this.datosHistoricoGuardar(this.info);
      
    });    
  }

  remove() {
    console.log('[WeatherCardComponent] remove()');
    this.removed.emit(this.location);
  }

  showDetails() {
    console.log('[WeatherCardComponent] showDetails()');
    this.router.navigateByUrl(`/details/${this.location.id}`);
  }
  showForecast() {
    console.log('[WeatherCardComponent] showForecast()');
    this.router.navigateByUrl(`/forecast/${this.location.id}`);
  }

  ngOnInit() {
    
    console.log('[WeatherCardComponent] ngOnInit()');
    this.weatherInfoService.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
      this.datosHistoricoGuardar(this.info);
      
    }); 
    interval(10800000).subscribe( // 10800000 cada 3 horas guarda la temperatura en el historico o cuando se dá a refrescar
      x => {
        this.refresh();
        console.log(x)
      }
    );

 
  }

  datosHistoricoGuardar(info:WeatherInfo):void{
       ///////////////// historico 
      ////////////////////////////////////////////////////
      
      if (localStorage.getItem('datosHistorico'))
      this.datosHistorico = JSON.parse(localStorage.getItem('datosHistorico'));         
      console.log(`location a insertar ${this.location.id}`);
      let arr_tmp = Array();
      let keys = Object.keys(this.datosHistorico);
      //console.log(`keys: ${keys}`);
      let arr_tmp1 = Array();
      let index = keys.findIndex((x => x === this.location.id.toString()));
      console.log(`index resul: ${index}`);
      if (index!=-1) { //existe       
        //console.log(`existe: ${index}`);
        let arrsub = Object.keys(this.datosHistorico[this.location.id]).map((k) => this.datosHistorico[this.location.id][k]);
        arrsub.push({ "ts": this.info.ts, "temp": this.info.temp, "dt_txt": this.info.dt_txt });        
        this.datosHistorico[this.location.id] = arrsub;
      }  else { //nuevo
        console.log('nuevo');
        arr_tmp.push({ "ts": this.info.ts, "temp": this.info.temp, "dt_txt": this.info.dt_txt });      
        this.datosHistorico[this.location.id]=arr_tmp; 
      }      
      ////////////////////////////
      //console.log(`bucle add: ${this.location.id}`);
      console.log(this.datosHistorico );
      localStorage.setItem('datosHistorico', JSON.stringify( this.datosHistorico))
      ////////////////// fin historico

  } //datos historico

}
