import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-city-weather',
  imports: [],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent implements OnInit{
  protected forecast_num: number = 0;


  constructor(protected weatherService:WeatherService, protected route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.weatherService.forecastUpdated$.subscribe(() => {
      this.cdr.detectChanges();
    });

  }

  ngOnInit() {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      console.log("Seite wurde aktualisiert!");
          this.weatherService.getWeatherByCoordinates(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lon")));
          this.weatherService.getForecastByCoordinates(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lon")));
        }
      }

  getForecastByNumber(num:number){
    switch (num){
      case 0: return this.weatherService.getCurrentDay();
      case 1: return this.weatherService.getFirstDay();
      case 2: return this.weatherService.getSecondDay();
      case 3: return this.weatherService.getThirdDay();
      case 4: return this.weatherService.getFourthDay();
      case 5: return this.weatherService.getFifthDay();
    }
  }

}





