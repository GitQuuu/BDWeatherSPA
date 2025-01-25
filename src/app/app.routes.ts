import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./weather-display/weather-display.component')
      .then(m => m.WeatherDisplayComponent)
  }
];
