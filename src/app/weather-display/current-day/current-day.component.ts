import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {CurrentDay, LocationModel} from '../../services/weather/forecastResponseModel';
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
export class CurrentDayComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.initChart();
  }
  @Input() currentDay!: CurrentDay;
  @Input() location!: LocationModel;
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

      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
