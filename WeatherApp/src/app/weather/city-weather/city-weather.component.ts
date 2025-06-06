import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {SearchComponent} from '../search/search.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-city-weather',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent implements OnInit{
  private weather:any;

  constructor(private weatherService:WeatherService, private searchComponent:SearchComponent) {
  }

  ngOnInit(){
    this.weatherService.getWeatherByCoordinates(this.searchComponent.getLat(),this.searchComponent.getLon()).subscribe({
      next: (data) => {
        this.weather = data;
        console.log(this.weather)
      }
    })
    console.log(this.weather);
  }



}
