import { Component } from '@angular/core';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  location: any;
  data: any
  latitude: any
  longitude: any

  constructor(private weatherService: WeatherService) {
  }

  search() {
    this.weatherService.getCoordinates('Deizisau').subscribe({
      next: (data) => {
        this.data = data;
        console.log(this.data);
        this.latitude = this.data[0].lat;
        this.longitude = this.data[0].lat;
      },
      error: (error) => {
        console.error('Fehler:', error);
      }
    });
  }

}
