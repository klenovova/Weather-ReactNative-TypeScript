import { convertTemp, getWeatherIcon } from "@/src/utils";
import { Icon, Text, VStack } from "@gluestack-ui/themed-native-base";

import { HStack } from "@gluestack-ui/themed-native-base";
import { ScrollView } from "@gluestack-ui/themed-native-base";
import GlassBox from "./GlassBox";
import { formatTime } from "@/src/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppSelector } from "@/src/store/hooks";
import { ForecastResponse } from "@/src/store/api/weatherApi";

const WeatherForecast = ({ forecast }: { forecast: ForecastResponse }) => {
  const temperatureUnit = useAppSelector(
    (state) => state.settings.temperatureUnit
  );

  return (
    <GlassBox>
      <Text color="white" fontSize="lg" fontWeight="semibold" mb={4}>
        Today's Forecast
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space={6}>
          {forecast.list.slice(0, 6).map((hour, i) => (
            <VStack key={i} space={2} alignItems="center">
              <Text color="white">{formatTime(hour.dt)}</Text>
              <Icon
                as={MaterialCommunityIcons}
                name={getWeatherIcon(hour.weather[0].main)}
                size={8}
                color="white"
              />
              <Text color="white" fontWeight="bold">
                {convertTemp(hour.main.temp, temperatureUnit)}
              </Text>
            </VStack>
          ))}
        </HStack>
      </ScrollView>
    </GlassBox>
  );
};

export default WeatherForecast;
