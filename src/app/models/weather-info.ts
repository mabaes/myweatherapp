export interface WeatherInfo {
    ts: number; // tiempo de adquisición (milisegundos)
    desc?: string; // descripción tiempo
    icon?: string; // icono para tiempo
    temp: number; // temperatura
    temp_max?: number; // temperatura máxima
    temp_min?: number; // temperatura mínima
    clouds?: number; // % de nubes
    humidity?: number; // % humedad
    pressure?: number; // presión
    wind?: number; // velocidad viento
    rain?: number; // volumen de lluvia
    snow?: number; // volumen de nieve
    dt_txt?:string //formato fecha
}
