import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather/weather.service';
import {ApiResponseModel} from '../services/ApiResponseModel';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent implements OnInit {
    constructor(private weatherService: WeatherService) {
    }

    ngOnInit(): void {
        this.weatherService.getWeatherData("Aalborg", 2).subscribe({
          next: (data) => {
            let response = data.body as ApiResponseModel
            console.log(response);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {}
        })
    }

}
