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
import {CurrentDay, Forecast, ForecastDay, LocationModel} from '../../services/weather/forecastResponseModel';
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
      console.log('Forecasts changed:', this.forecasts);
      if (this.forecasts){
        for (const day of this.forecasts.forecastday) {
          console.log(day);
        }
      }
      // Reinitialize chart or perform other actions
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
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      // ✅ Extract forecast dates for labels
      const labels = this.forecasts.forecastday.map(forecast => forecast.date || 'No Date');
      console.log(labels)


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
            data: [50, 25, 12, 48, 56, 76, 42]
          },
          {
            type: 'bar',
            label: 'humidity',
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            data: [21, 84, 24, 75, 37, 65, 34],
            borderColor: 'white',
            borderWidth: 2
          },
          {
            type: 'bar',
            label: 'wind',
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            data: [41, 52, 24, 74, 23, 21, 32]
          },
          {
            type: 'line',
            label: 'rain',
            borderColor: documentStyle.getPropertyValue('--p-blue-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [33, 10, 50, 80, 80, 0, 5]
          },
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
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
        }
      };
      this.cd.markForCheck();
    }
  }

  onChangeLocationClick() {
    console.log(this.currentDay);
  }
}
