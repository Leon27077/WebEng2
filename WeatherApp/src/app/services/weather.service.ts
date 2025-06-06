import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public coordinates: any;
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '89836a59d86d39b9fc8e232f73d7c2ce';

  constructor(private http: HttpClient) { }

  getCoordinates(city:any): Observable<any>{
   this.coordinates = this.http.get(`${this.geoUrl}?q=${city}&limit=5&appid=${this.apiKey}`);
    return this.coordinates;
  }

}
