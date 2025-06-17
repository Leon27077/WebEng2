import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private isInitialLoad = true;
  private idx: any;
  private information: any;
  private currentWeather:any;
  private geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://pro.openweathermap.org/data/2.5/forecast'
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

  private current_day:any = [];
  private first_day:any = [];
  private second_day:any = [];
  private third_day:any= [];
  private fourth_day:any= [];
  private fifth_day:any = []

  private forecastUpdated = new BehaviorSubject<boolean>(false);
  forecastUpdated$ = this.forecastUpdated.asObservable();


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

          if (this.isInitialLoad) {
            const currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
            });
            this.isInitialLoad = false;
          }
        }
      })
  }


  getForecastByCoordinates(lat:number, lon:number){
    this.first_day = [];
    this.http.get(`${this.forecastUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`).subscribe({
      next: (data:any) => {
        for (let item of data.list){
          let date = new Date();
          let itemDate: Date = new Date(item.dt*1000)
        if (this.checkForDay(0, itemDate, date)){
          this.current_day = this.saveDate(this.current_day, itemDate, item);
        }
        else if(this.checkForDay(1, itemDate, date)){
          this.first_day = this.saveDate(this.first_day, itemDate, item);
          console.log(this.first_day)
        }
        else if(this.checkForDay(2, itemDate, date)){
          this.second_day = this.saveDate(this.second_day, itemDate, item);
      }
        else if(this.checkForDay(3, itemDate, date)){
          this.third_day = this.saveDate(this.third_day, itemDate, item);
      }
        else if(this.checkForDay(4, itemDate, date)){
          this.fourth_day = this.saveDate(this.fourth_day, itemDate, item);
    }
        else if(this.checkForDay(5, itemDate, date)) {
          this.fifth_day = this.saveDate(this.fifth_day, itemDate, item);
        }
        }
        this.forecastUpdated.next(true);
      }
    }
        )
  }


  public getCurrentDay(){
    return this.current_day;
  }

  public getFirstDay(){
    return this.first_day;
  }

  public getSecondDay(){
    return this.second_day;
  }

  public getThirdDay(){
    return this.third_day;
  }

  public getFourthDay(){
    return this.fourth_day;
  }

  public getFifthDay(){
    return this.fifth_day;
  }


  private getWeatherIconByCode(iconCode:string){
    return this.http.get('https://openweathermap.org/img/wn/{iconCode}@2x.png');

  }

  private checkForDay(day: number, itemDate: Date, date: Date){
    let compareDate = new Date(date);
    compareDate.setDate(date.getDate() + day);
    return itemDate.toLocaleString().split(',')[0] === compareDate.toLocaleString().split(',')[0]
  }

  private saveDate(li: any, itemDate:Date, item:any){
    return [...li, [this.getDayByInt(itemDate.getDay()), itemDate.toLocaleString().split(',')[1], this.roundTemp(item.main.temp), item.weather[0].icon]];
  }

  private getDayByInt(int: number): string {
    switch (int) {
      case 0: return 'Sonntag';
      case 1: return 'Montag';
      case 2: return 'Dienstag';
      case 3: return 'Mittwoch';
      case 4: return 'Donnerstag';
      case 5: return 'Freitag';
      case 6: return 'Samstag';
      default: return 'Ungültiger Tag';
    }
  }

  private roundTemp(temp: number):number{
    return Math.round(temp - 273.15);
  }


  public resetInitialLoad() {
    this.isInitialLoad = true;
  }


  public setIdx(idx: number){
    this.idx = idx;
  }

  public getIdx(){
    return this.idx;
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
