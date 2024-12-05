import { WeatherResponse } from "@/src/store/api/weatherApi";
import { useAppSelector } from "@/src/store/hooks";
import { convertTemp } from "@/src/utils";

import { getWeatherIcon } from "@/src/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon, Text } from "@gluestack-ui/themed-native-base";

import { VStack } from "@gluestack-ui/themed-native-base";

const MainWeatherDisplay = ({ currentWeather }: { currentWeather: WeatherResponse }) => {
    const temperatureUnit = useAppSelector(
        (state) => state.settings.temperatureUnit
      );

    return (
        <VStack space={2} alignItems="center" py={10}>
            <Icon 
              as={MaterialCommunityIcons} 
              name={getWeatherIcon(currentWeather.weather[0].main)}
              size={20} 
              color="white" 
            />
            <Text color="white" fontSize="6xl" fontWeight="bold">
              {convertTemp(currentWeather.main.temp, temperatureUnit)}
            </Text>
            <Text color="white" fontSize="xl">
              {currentWeather.weather[0].main}
            </Text>
            <Text color="white" fontSize="md">
              Feels like {convertTemp(currentWeather.main.feels_like, temperatureUnit)}
            </Text>
        </VStack>
    )
}

export default MainWeatherDisplay;