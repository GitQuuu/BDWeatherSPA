import {Component, OnDestroy, OnInit, signal} from '@angular/core';
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
import {ToggleSwitch} from 'primeng/toggleswitch';

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
    ToggleSwitch,
  ],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {
  private weatherDataSub: Subscription = new Subscription();
  newLocation: string = '';
  updateCurrentDay:any;
  isDarkMode = signal<boolean>(false);

  constructor(protected weatherService: WeatherService) {
    this.getWeatherData("Århus")
  }

  ngOnDestroy(): void {
    this.weatherDataSub.unsubscribe();
  }

  ngOnInit(): void {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      const isDark = JSON.parse(storedDarkMode);
      this.isDarkMode.set(isDark);
      this.applyTheme(isDark);
    }
  }



  getWeatherData(location:string){
    this.weatherDataSub = this.weatherService.getWeatherData(location, 7).subscribe({
      next: (data) => {
        let response = data.body as ApiResponseModel;
        this.weatherService.$CurrentDay.set(response.data.current as CurrentDay);
        this.weatherService.$Forecast.set(response.data.forecast as Forecast);
        this.weatherService.$Location.set(response.data.location as LocationModel);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getWeatherClass(this.weatherService.$CurrentDay()?.condition.text.toLowerCase() || "");
      }
    })
  }

  getWeatherClass(condition:string) {
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
  }


  newLocationListener($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    this.newLocation = inputElement.value;
  }

  updateLocationClick() {
    this.getWeatherData(this.newLocation);
  }

  listenToChartClick($event: ForecastDay) {
    this.updateCurrentDay = $event;
    const condition = this.updateCurrentDay.day.condition.text.toLowerCase() || ""
    this.getWeatherClass(condition);
  }

  applyTheme(isDark: boolean) {
    const element = document.querySelector('html');
    if (isDark) {
      element?.classList.add('dark');
    } else {
      element?.classList.remove('dark');
    }
  }

  toggleDarkMode() {
    const newDarkModeState = !this.isDarkMode();
    this.isDarkMode.set(newDarkModeState);
    localStorage.setItem('darkMode', JSON.stringify(newDarkModeState)); 
    this.applyTheme(newDarkModeState);
  }

  darkThemeSwitchTokens = {
    width: '4.2rem',
    height: '2.3rem',
    checkedBackground: '#ccc',
    checkedHoverBackground: '#ddd',
    handle: {
      size: '2rem',
      background: 'transparent url("https://cdn-icons-png.flaticon.com/128/10484/10484062.png") 0 0 / 2rem no-repeat',
      hoverBackground: 'transparent url("https://cdn-icons-png.flaticon.com/128/10484/10484062.png") 0 0 / 2rem no-repeat',
      checkedBackground:
        'transparent url("https://cdn-icons-png.flaticon.com/128/2024/2024058.png") 0 0 / 2rem no-repeat',
      checkedHoverBackground:
        'transparent url("https://cdn-icons-png.flaticon.com/128/2024/2024058.png") 0 0 / 2rem no-repeat',
    },
  };
}
