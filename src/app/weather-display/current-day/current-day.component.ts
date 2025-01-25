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
export class CurrentDayComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() currentDay!: CurrentDay;
  @Input() location!: LocationModel;

  @Output() changeLocation = new EventEmitter();

  onChangeLocationClick() {

  }
}
