export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getWeatherIcon = (condition: string): string => {
  const weatherMap: { [key: string]: string } = {
    Clear: "weather-sunny",
    Clouds: "weather-cloudy",
    "Partly Cloudy": "weather-partly-cloudy",
    Rain: "weather-rainy",
    Drizzle: "weather-partly-rainy",
    Thunderstorm: "weather-lightning-rainy",
    Snow: "weather-snowy",
    Mist: "weather-fog",
    Smoke: "weather-fog",
    Haze: "weather-hazy",
    Dust: "weather-fog",
    Fog: "weather-fog",
    Sand: "weather-fog",
    Ash: "weather-fog",
    Squall: "weather-windy",
    Tornado: "weather-tornado",
  };

  return weatherMap[condition] || "weather-cloudy";
};

export const convertTemp = (celsius: number, temperatureUnit: string): string => {
    if (temperatureUnit === 'fahrenheit') {
      return `${Math.round((celsius * 9/5) + 32)}°F`;
    }
    return `${Math.round(celsius)}°C`;
};
