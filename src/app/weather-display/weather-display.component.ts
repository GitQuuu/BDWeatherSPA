import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../services/weather/weather.service';
import {CurrentDay, Forecast, ForecastDay, LocationModel} from '../services/weather/forecastResponseModel';
import {Subscription} from 'rxjs';
import {NgClass} from '@angular/common';
import {CurrentDayComponent} from './current-day/current-day.component';
import {WeatherClass} from './weatherClass';
import {ForecastComponent} from './forecast/forecast.component';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {ApiResponseModel} from '../services/ApiResponseModel';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [
    NgClass,
    CurrentDayComponent,
    ForecastComponent,
    FloatLabel,
    FormsModule,
    InputText,
    Button,
  ],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  private weatherDataSub: Subscription = new Subscription();
  newLocation: string = '';
  updateCurrentDay:any;

  constructor(protected weatherService: WeatherService) {
    this.getWeatherData("Århus")
  }

  ngOnDestroy(): void {
    this.weatherDataSub.unsubscribe();
  }

  ngOnInit(): void {

    console.log("Weather Display Component loaded");
  }

  getWeatherData(location:string){
    this.weatherDataSub = this.weatherService.getWeatherData(location, 7).subscribe({
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


  newLocationListener($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    console.log(inputElement.value);
    this.newLocation = inputElement.value;
  }

  updateLocationClick() {
    this.getWeatherData(this.newLocation);
  }

  listenToChartClick($event: ForecastDay) {
    this.updateCurrentDay = $event;
  }
}
