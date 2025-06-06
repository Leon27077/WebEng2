import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private information: any;
  private currentWeather:any;
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '89836a59d86d39b9fc8e232f73d7c2ce';

  constructor(private http: HttpClient) { }

  getInfo(city:any): Observable<any>{
   this.information = this.http.get(`${this.geoUrl}?q=${city}&limit=5&appid=${this.apiKey}`);
    return this.information;
  }

  getWeatherByCoordinates(lat:number, lon:number){
    this.currentWeather = this.http.get(`${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
    return this.currentWeather;
  }


}
