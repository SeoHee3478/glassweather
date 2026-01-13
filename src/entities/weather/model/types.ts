export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  dt: number;
}

export interface ForecastResponse {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
    };
  }>;
}
