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
  private weather:any;

  constructor(protected weatherService:WeatherService, protected route: ActivatedRoute) {
  }

  ngOnInit() {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      console.log("Seite wurde aktualisiert!");
      const city_name = this.weatherService.getInfo(this.route.snapshot.paramMap.get('name'));
      city_name.subscribe({
        next: (data: any) => {

        }
      });
    }
  }




}
