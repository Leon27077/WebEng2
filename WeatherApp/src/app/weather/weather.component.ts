import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit{
  location: any;
  data: any
  latitude: any
  longitude: any

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
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
