import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private information: any;
  private currentWeather:any;
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '89836a59d86d39b9fc8e232f73d7c2ce';
  private dt: any;
  private feels_like: any;
  private humidity: any;
  private temp: any;
  private sunrise: any;
  private sunset: any;
  private timezone: any;
  private visibility: any;
  private weather_description: any;
  private wind_speed: any;
  private hide_weather:boolean = false;


  constructor(private http: HttpClient, private router: Router) { }

  getInfo(city:any): Observable<any>{
   this.information = this.http.get(`${this.geoUrl}?q=${city}&limit=5&appid=${this.apiKey}`);
    return this.information;
  }

  getWeatherByCoordinates(lat:number, lon:number) {
      this.currentWeather = this.http.get(`${this.weatherUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
      this.currentWeather.subscribe({
        next: (data: any) => {
          this.currentWeather = data;
          console.log(this.currentWeather);
          this.dt = this.currentWeather.dt;
          this.feels_like = this.currentWeather.main.feels_like;
          this.humidity = this.currentWeather.main.humidity;
          this.temp = this.currentWeather.main.temp;
          this.sunrise = this.currentWeather.sys.sunrise;
          this.sunset = this.currentWeather.sys.sunset;
          this.timezone = this.currentWeather.timezone;
          this.visibility = this.currentWeather.visibility;
          this.weather_description = this.currentWeather.weather[0].description;
          this.wind_speed = this.currentWeather.wind.speed;

          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
          });
        }
      })
  }

  public isHideWeather(){
    return this.hide_weather;
  }

  public setHideWeather(bool: boolean){
    this.hide_weather = bool;
  }

  public calculateTime(dt: any, timezone: any){
    const utcDate = new Date(dt*1000);
    const localOffset = utcDate.getTimezoneOffset() * 60;
    const finalDate = new Date((this.dt + timezone + localOffset)*1000);
    return finalDate.toLocaleString();

  }

  public getDt(){
    return this.dt;
    //return this.calculateTime(this.dt,this.timezone);
  }

  public getFeelsLike(){
    return this.feels_like -273.15;
  }
  public getHumidity(){
    return this.humidity;
  }
  public getTemp(){
    return this.temp -273.15;
  }
  public getSunrise(){
    return this.calculateTime(this.sunrise, this.timezone);
  }
  public getSunset(){
    return this.calculateTime(this.sunset, this.timezone);
  }
  public getTimezone(){
    return this.timezone;
  }
  public getVisibility(){
    return this.visibility;
  }
  public getWeatherDescription(){
    return this.weather_description;
  }
  public getWindSpeed(){
    return this.wind_speed;
  }

}
