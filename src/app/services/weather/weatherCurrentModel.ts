export interface WeatherCurrent {
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
