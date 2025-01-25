import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {CurrentDay, Forecast, LocationModel} from '../../services/weather/forecastResponseModel';
import {DatePipe, isPlatformBrowser} from '@angular/common';
import {ChartModule, UIChart} from 'primeng/chart';

@Component({
  selector: 'app-current-day',
  standalone: true,
  imports: [
    Card,
    Button,
    DatePipe,
    UIChart,
  ],
  providers: [
    ChartModule
  ],
  templateUrl: './current-day.component.html',
  styleUrl: './current-day.component.css'
})
export class CurrentDayComponent implements OnInit, OnChanges {
  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forecasts']) {
      this.initChart();
    }
  }

  ngOnInit(): void {

  }
  @Input() currentDay!: CurrentDay;
  @Input() location!: LocationModel;
  @Input() forecasts!: Forecast;
  @Output() changeLocation = new EventEmitter();
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  initChart() {
    if (isPlatformBrowser(this.platformId) && this.forecasts?.forecastday){
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      const labels = this.forecasts.forecastday.map(forecast => forecast.date || 'No Date');
      const temperature = this.forecasts.forecastday.map(forecast => forecast.day.avgtemp_c );
      const humidity = this.forecasts.forecastday.map(forecast => forecast.day.avghumidity );
      const wind = this.forecasts.forecastday.map(forecast => forecast.day.maxwind_kph );
      const rain = this.forecasts.forecastday.map(forecast => forecast.day.totalprecip_mm );

      this.data = {
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: 'celcius',
            borderColor: documentStyle.getPropertyValue('--p-orange-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: temperature
          },
          {

            type: 'line',
            label: 'humidity %',
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            data: humidity,
            borderColor: 'white',
            borderWidth: 2
          },
          {
            type: 'line',
            label: 'wind kph',
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            data: wind,
          },
          {

            type: 'bar',
            label: 'rain mm.',
            borderColor: documentStyle.getPropertyValue('--p-blue-500'),
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            data: rain
          },
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.4,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        },
        onClick: (event: any, elements: any[]) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const dateClicked = labels[index];

            console.log(`Clicked on date: ${dateClicked}`);

            const clickedForecast = this.forecasts!.forecastday.find(forecast => forecast.date === dateClicked);
            console.log(clickedForecast);

            if (clickedForecast) {
              this.currentDay.temp_c = clickedForecast.day.avgtemp_c;
              this.currentDay.humidity = clickedForecast.day.avghumidity;
              this.currentDay.wind_kph = clickedForecast.day.maxwind_kph;
              this.currentDay.precip_mm = clickedForecast.day.totalprecip_mm;
              this.currentDay.condition.text = clickedForecast.day.condition.text;
              this.currentDay.condition.icon = clickedForecast.day.condition.icon;

              this.cd.detectChanges();
            }
          }
        }
      };
      this.cd.markForCheck();
    }
  }


  onChangeLocationClick() {

  }
}
