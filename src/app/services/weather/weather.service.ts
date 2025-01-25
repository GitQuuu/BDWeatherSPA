import {Injectable, signal } from '@angular/core';
import {HttpService} from '../http.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CurrentDay, ForecastDay, LocationModel} from './forecastResponseModel';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends HttpService{

  constructor(httpClient: HttpClient) {
    super(environment.apiUrl + "/api", "weather", httpClient);
  }

  $CurrentDay = signal<CurrentDay>(null!);
  $CurrentDayBackground = signal<string>('')
  $Forecast = signal<ForecastDay[]>([]);
  $Location = signal<LocationModel>(null!);

  getWeatherData(query:string, days:number){
    return this.httpClient.get(`${environment.apiUrl}/api/Weather?query=${query}&days=${days}&language=dk`, {
      observe     : 'response',
      responseType: 'json',
    })
  }

}
