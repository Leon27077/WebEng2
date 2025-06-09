import { Component, ChangeDetectorRef} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchValue:any;
  location: any;
  data: any[] = [];
  latitude: any
  longitude: any
  showResults: boolean = false;

  constructor(protected weatherService: WeatherService, private cdr: ChangeDetectorRef) {
  }


  search(city:any) {
    this.weatherService.getInfo(city).subscribe({
      next: (data) => {
        this.data = data;
        this.showResults = true;
        console.log(this.data);
        this.cdr.markForCheck();

      },
      error: (error) => {
        console.error('Fehler:', error);
        this.showResults = false;
        this.cdr.markForCheck();
      }
    });
  }

  emptySearchValue(){
    this.searchValue = "";
  }

  hideResults(){
    this.showResults = false;
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
