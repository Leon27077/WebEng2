import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather.service';
import {SearchComponent} from './search/search.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-weather',
  imports: [
    SearchComponent,
    RouterOutlet
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent{


}
