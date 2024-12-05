import { convertTemp } from "@/src/utils";
import { HStack } from "@gluestack-ui/themed-native-base";
import { VStack } from "@gluestack-ui/themed-native-base";
import GlassBox from "./GlassBox";
import WeatherInfo from "./WeatherInfo";
import { formatTime } from "@/src/utils";
import { WeatherResponse } from "@/src/store/api/weatherApi";
import { useAppSelector } from "@/src/store/hooks";

const WeatherDetails = ({
  currentWeather,
}: {
  currentWeather: WeatherResponse;
}) => {
  const temperatureUnit = useAppSelector(
    (state) => state.settings.temperatureUnit
  );

  return (
    <GlassBox>
      <VStack space={8}>
        <HStack justifyContent="space-between">
          <WeatherInfo
            label="Humidity"
            value={`${currentWeather.main.humidity}%`}
            icon="water-percent"
          />
          <WeatherInfo
            label="Wind Speed"
            value={`${Math.round(currentWeather.wind.speed * 3.6)} km/h`}
            icon="weather-windy"
          />
          <WeatherInfo
            label="Feels Like"
            value={convertTemp(currentWeather.main.feels_like, temperatureUnit)}
            icon="thermometer"
          />
        </HStack>

        <HStack justifyContent="space-between">
          <WeatherInfo
            label="Sunrise"
            value={formatTime(currentWeather.sys.sunrise)}
            icon="weather-sunset-up"
          />
          <WeatherInfo
            label="Sunset"
            value={formatTime(currentWeather.sys.sunset)}
            icon="weather-sunset-down"
          />
        </HStack>
      </VStack>
    </GlassBox>
  );
};

export default WeatherDetails;
