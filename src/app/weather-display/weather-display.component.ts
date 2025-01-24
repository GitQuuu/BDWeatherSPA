import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather/weather.service';
import {ApiResponseModel} from '../services/apiResponseModel';
import {WeatherCurrent} from '../services/weather/weatherCurrentModel';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  private weatherDataSub: Subscription = new Subscription();
    constructor(private weatherService: WeatherService) {
    }

  ngOnDestroy(): void {
        this.weatherDataSub.unsubscribe();
    }

    ngOnInit(): void {
        this.weatherDataSub = this.weatherService.getWeatherData("Aalborg", 2).subscribe({
          next: (data) => {
            let response = data.body as ApiResponseModel;
            this.weatherService.$CurrentDay.set(response.data.current as WeatherCurrent);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {}
        })
    }

}
