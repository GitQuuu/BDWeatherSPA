import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather/weather.service';
import {ApiResponseModel} from '../services/apiResponseModel';
import {CurrentDay, ForecastDay, LocationModel} from '../services/weather/forecastResponseModel';
import {Subscription} from 'rxjs';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  private weatherDataSub: Subscription = new Subscription();
    constructor(protected weatherService: WeatherService) {
    }

  ngOnDestroy(): void {
        this.weatherDataSub.unsubscribe();
    }

    ngOnInit(): void {
        this.weatherDataSub = this.weatherService.getWeatherData("Aalborg", 2).subscribe({
          next: (data) => {
            let response = data.body as ApiResponseModel;
            console.log(response);
            this.weatherService.$CurrentDay.set(response.data.current as CurrentDay);
            this.weatherService.$Forecast.set(response.data.forecast as ForecastDay[]);
            this.weatherService.$Location.set(response.data.location as LocationModel);
            console.log(this.weatherService.$CurrentDay());
            console.log(this.weatherService.$Forecast());
            console.log(this.weatherService.$Location());
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {}
        })
    }

  getWeatherClass(): string {
    const condition = this.weatherService.$CurrentDay()?.condition.text.toLowerCase() || "";

    if (condition.includes("rain")) return "rainy";
    if (condition.includes("overcast")) return "cloudy";
    if (condition.includes("sunny") || condition.includes("clear")) return "clear";
    if (condition.includes("snow")) return "snowy";
    if (condition.includes("storm") || condition.includes("thunder")) return "stormy";
    if (condition.includes("fog") || condition.includes("haze")) return "foggy";
    if (condition.includes("wind")) return "windy";

    return "default-weather";
  }

}
