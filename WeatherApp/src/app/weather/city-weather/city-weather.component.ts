import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-city-weather',
  imports: [],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent implements OnInit{


  constructor(protected weatherService:WeatherService, protected route: ActivatedRoute) {
  }

  ngOnInit() {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      console.log("Seite wurde aktualisiert!");
          this.weatherService.getWeatherByCoordinates(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lon")));

        }
      }
}





