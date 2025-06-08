import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {SearchComponent} from '../search/search.component';

@Component({
  selector: 'app-city-weather',
  imports: [],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent{
  private weather:any;

  constructor(protected weatherService:WeatherService) {
  }


}
