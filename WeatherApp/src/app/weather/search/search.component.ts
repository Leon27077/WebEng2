import { Component } from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  location: any;
  data: any[] = [];
  latitude: any
  longitude: any
  showResults: boolean = false;

  constructor(private weatherService: WeatherService) {
  }

  search(city:any) {
    this.weatherService.getInfo(city).subscribe({
      next: (data) => {
        this.data = data;
        console.log(this.data);
        this.showResults = true;
      },
      error: (error) => {
        console.error('Fehler:', error);
        this.showResults = false;
      }
    });
  }


  setLat(idx:number){
    this.latitude = this.data[idx].lat;
  }

  setLon(idx:number){
    this.longitude = this.data[idx].lon;
  }

  getLat(){
    return this.latitude;
  }

  getLon(){
    return this.longitude;
  }




}
