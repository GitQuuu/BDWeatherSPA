import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input, OnChanges,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import {Card} from 'primeng/card';
import {isPlatformBrowser} from '@angular/common';
import {UIChart} from 'primeng/chart';
import {CurrentDay, Forecast, ForecastDay} from '../../services/weather/forecastResponseModel';

@Component({
  selector: 'app-forecast',
  imports: [
    Card,
    UIChart
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnChanges {
  @Input() forecasts!: Forecast;
  @Input() currentDay!: CurrentDay;
  @Output() emitClickedForecastDay = new EventEmitter<ForecastDay>();
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forecasts']) {
      this.initChart();
    }
  }

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
              this.emitClickedForecastDay.emit(clickedForecast);
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
      this.cd.detectChanges();
    }
  }
}
