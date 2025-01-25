import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather/weather.service';
import {ApiResponseModel} from '../services/apiResponseModel';
import {CurrentDay, Forecast, ForecastDay, LocationModel} from '../services/weather/forecastResponseModel';
import {Subscription} from 'rxjs';
import {NgClass} from '@angular/common';
import {CurrentDayComponent} from './current-day/current-day.component';
import {WeatherClass} from './weatherClass';
import {ForecastComponent} from './forecast/forecast.component';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [
    NgClass,
    CurrentDayComponent,
    ForecastComponent,
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
        this.weatherDataSub = this.weatherService.getWeatherData("Aalborg", 7).subscribe({
          next: (data) => {
            let response = data.body as ApiResponseModel;
            console.log(response);
            this.weatherService.$CurrentDay.set(response.data.current as CurrentDay);
            this.weatherService.$Forecast.set(response.data.forecast as Forecast);
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

    let selector = WeatherClass.Default;

    if (condition.includes("light rain")) selector = WeatherClass.LightRain;
    if (condition.includes("rain")) selector = WeatherClass.Rainy;
    if (condition.includes("overcast")) selector = WeatherClass.Cloudy;
    if (condition.includes("partly cloudy")) selector = WeatherClass.PartlyCloudy;
    if (condition.includes("sunny")) selector = WeatherClass.Sunny;
    if (condition.includes("clear")) selector = WeatherClass.Clear;
    if (condition.includes("snow")) selector = WeatherClass.Snowy;
    if (condition.includes("storm") || condition.includes("thunder")) selector = WeatherClass.Stormy;
    if (condition.includes("fog") || condition.includes("haze")) selector = WeatherClass.Foggy;
    if (condition.includes("wind")) selector = WeatherClass.Windy;

    this.weatherService.$CurrentDayBackground.set(selector);
    console.log(this.weatherService.$CurrentDayBackground());
  }

}
