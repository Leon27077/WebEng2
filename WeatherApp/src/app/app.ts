import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WeatherComponent} from './weather/weather.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherComponent,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'WeatherApp';
}
