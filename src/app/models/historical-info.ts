import { WeatherInfo } from './weather-info';
export interface HistoricalInfo {
    [id: number]:  WeatherInfo[]
}