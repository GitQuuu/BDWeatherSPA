export interface CurrentDay {
  cloud: number;
  condition: {
    code: number;
    icon: string;
    text: string;
  };
  dew_point_c: number;
  dew_point_f: number;
  feels_like_c: number;
  feels_like_f: number;
  gust_kph: number;
  gust_mph: number;
  heat_index_c: number;
  heat_index_f: number;
  humidity: number;
  is_day: number;
  last_updated: string;
  last_updated_epoch: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  wind_chill_c: number;
  wind_chill_f: number;
  wind_deg: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
}

export type Forecast = {
  forecastday : ForecastDay[];
}
export type ForecastDay = {
  date: string;
  dateEpoch: number;
  astro: Astro;
  day: DayWeather;
  hour: HourlyWeather[];
};

export type Astro = {
  isMoonUp: number;
  isSunUp: number;
  moonIllumination: number;
  moonPhase: string | null;
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
};

export type DayWeather = {
  avghumidity: number;
  avgtemp_c: number;
  avgtemp_f: number;
  avgvis_km: number;
  avgvis_miles: number;
  condition: {
    text: string;
    icon: string;
  };
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
  maxtemp_c: number;
  maxtemp_f: number;
  maxwind_kph: number;
  maxwind_mph: number;
  mintemp_c: number;
  mintemp_f: number;
  totalprecip_in: number;
  totalprecip_mm: number;
  totalsnow_cm: number;
  uv: number;
};

export type HourlyWeather = {
  chance_of_rain: number;
  chance_of_snow: number;
  cloud: number;
  condition: {
    text: string;
    icon: string;
  };
  dewpoint_c: number;
  dewpoint_f: number;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  heatindex_c: number;
  heatindex_f: number;
  humidity: number;
  is_day: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  snow_cm: number;
  temp_c: number;
  temp_f: number;
  time: string;
  time_epoch: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  will_it_rain: number;
  will_it_snow: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
  windchill_c: number;
  windchill_f: number;
};

export type LocationModel = {
  country: string;
  lat: number;
  localtime: string;
  localtimeEpoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
};


