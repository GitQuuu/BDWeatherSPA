import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather/weather.service';
import {ApiResponseModel} from '../services/apiResponseModel';
import {CurrentDay, ForecastDay, LocationModel} from '../services/weather/forecastResponseModel';
import {Subscription} from 'rxjs';
import {NgClass} from '@angular/common';
import {CurrentDayComponent} from './current-day/current-day.component';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [
    NgClass,
    CurrentDayComponent,
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
          complete: () => {
            this.getWeatherClass();
          }
        })
      console.log("Weather Display Component loaded");
    }

  getWeatherClass() {
    const condition = this.weatherService.$CurrentDay()?.condition.text.toLowerCase() || "";
    console.log("Current weather condition:", condition);

    let weatherClass = "default-weather";

    if (condition.includes("rain")) weatherClass = "rainy";
    if (condition.includes("overcast")) weatherClass = "cloudy";
    if (condition.includes("partly cloudy")) weatherClass = "partly-cloudy";
    if (condition.includes("sunny") || condition.includes("clear")) weatherClass = "clear";
    if (condition.includes("snow")) weatherClass = "snowy";
    if (condition.includes("storm") || condition.includes("thunder")) weatherClass = "stormy";
    if (condition.includes("fog") || condition.includes("haze")) weatherClass = "foggy";
    if (condition.includes("wind")) weatherClass = "windy";

    this.weatherService.$CurrentDayBackground.set(weatherClass);
    console.log(this.weatherService.$CurrentDayBackground());
  }

}
