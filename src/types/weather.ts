export interface CurrentWeather {
  city: string;
  cityCode: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  description: string;
  icon: string;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
}
