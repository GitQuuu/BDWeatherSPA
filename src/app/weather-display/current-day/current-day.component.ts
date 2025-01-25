import {Component, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {CurrentDay, LocationModel} from '../../services/weather/forecastResponseModel';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-current-day',
  imports: [
    Card,
    Button,
    DatePipe
  ],
  templateUrl: './current-day.component.html',
  styleUrl: './current-day.component.css'
})
export class CurrentDayComponent {
  @Input() currentDay!: CurrentDay;
  @Input() location!: LocationModel;
}
