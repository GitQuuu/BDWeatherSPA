import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {Card} from 'primeng/card';

import {CurrentDay, LocationModel} from '../../services/weather/forecastResponseModel';
import {DatePipe } from '@angular/common';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-current-day',
  standalone: true,
  imports: [
    Card,
    DatePipe,
  ],
  providers: [
    ChartModule
  ],
  templateUrl: './current-day.component.html',
  styleUrl: './current-day.component.css'
})
export class CurrentDayComponent {
  @Input() currentDay!: CurrentDay;
  @Input() location!: LocationModel;
  @Output() changeLocation = new EventEmitter();

}
