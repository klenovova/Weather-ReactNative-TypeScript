import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OPENWEATHER_API_KEY = 'f06e09d7f145979f8db2e2153a916104';
const BASE_URL = 'https://api.openweathermap.org';

export interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
  dt: number;
}

export interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      icon: string;
    }>;
  }>;
}

export interface CitySearchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Weather'],
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<WeatherResponse, { lat: number; lon: number }>({
      query: ({ lat, lon }) => ({
        url: '/data/2.5/weather',
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      }),
      providesTags: ['Weather'],
    }),
    getHourlyForecast: builder.query<ForecastResponse, { lat: number; lon: number }>({
      query: ({ lat, lon }) => ({
        url: '/data/2.5/forecast',
        params: {
          lat,
          lon,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      }),
      providesTags: ['Weather'],
    }),
    searchCities: builder.query<CitySearchResult[], string>({
      query: (query) => ({
        url: '/geo/1.0/direct',
        params: {
          q: query,
          limit: 5,
          appid: OPENWEATHER_API_KEY,
        },
      }),
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetHourlyForecastQuery,
  useSearchCitiesQuery,
} = weatherApi; 