import React, { useEffect, useState } from "react";
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Icon,
  IconButton,
  Spinner,
  useToast,
} from "@gluestack-ui/themed-native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppSelector } from "@/src/store/hooks";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Platform,
  Pressable,
  View,
  Alert,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import {
  useGetCurrentWeatherQuery,
  useGetHourlyForecastQuery,
} from "@/src/store/api/weatherApi";
import { useLocalSearchParams, useRouter } from "expo-router";
import { convertTemp, formatTime } from "@/src/utils";
import { styles } from "@/src/styles/weather.styles";
import GlassBox from "@/components/weather/GlassBox";
import WeatherInfo from "@/components/weather/WeatherInfo";
import { getWeatherIcon } from "@/src/utils";
import WeatherLoadError from "@/components/weather/WeatherLoadError";
import WeatherForecast from "@/components/weather/WeatherForecast";
import WeatherDetails from "@/components/weather/WeatherDetails";
import MainWeatherDisplay from "@/components/weather/MainWeatherDisplay";

export default function WeatherScreen() {
  const temperatureUnit = useAppSelector(
    (state) => state.settings.temperatureUnit
  );
  const params = useLocalSearchParams<{
    lat?: string;
    lon?: string;
    cityName?: string;
    countryCode?: string;
    stateName?: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [locationDisplay, setLocationDisplay] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.lat && params.lon) {
      setLocation({
        lat: parseFloat(params.lat),
        lon: parseFloat(params.lon),
      });

      if (params.cityName) {
        const displayParts = [
          params.cityName,
          params.stateName,
          params.countryCode,
        ].filter(Boolean);
        setLocationDisplay(displayParts.join(", "));
      }
    } else {
      requestLocationPermission();
    }
  }, [
    params.lat,
    params.lon,
    params.cityName,
    params.countryCode,
    params.stateName,
  ]);

  const {
    data: currentWeather,
    isLoading: isLoadingWeather,
    isError: isWeatherError,
    error: weatherError,
    refetch: refetchWeather,
  } = useGetCurrentWeatherQuery(location ?? { lat: 0, lon: 0 }, {
    skip: !location,
  });

  useEffect(() => {
    if (currentWeather && !params.cityName) {
      setLocationDisplay(
        `${currentWeather.name}, ${currentWeather.sys.country}`
      );
    }
  }, [currentWeather, params.cityName]);

  const {
    data: forecast,
    isLoading: isLoadingForecast,
    isError: isForecastError,
    error: forecastError,
    refetch: refetchForecast,
  } = useGetHourlyForecastQuery(location ?? { lat: 0, lon: 0 }, {
    skip: !location,
  });

  const requestLocationPermission = async () => {
    try {
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();

      if (existingStatus === "denied") {
        Alert.alert(
          "Location Access Required",
          "Please enable location access in your device settings to see weather for your current location.",
          [
            {
              text: "Go Back",
              onPress: handleBackToSearch,
              style: "cancel",
            },
            {
              text: "Open Settings",
              onPress: () => {
                Platform.OS === "ios"
                  ? Linking.openURL("app-settings:")
                  : Linking.openSettings();
              },
            },
          ]
        );
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toast.show({
          description: "Permission to access location was denied",
          placement: "top",
        });
        handleBackToSearch();
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    } catch (error) {
      toast.show({
        description: "Error getting location",
        placement: "top",
      });
      handleBackToSearch();
    }
  };

  const handleBackToSearch = () => {
    router.back();
  };

  const handleRefresh = async () => {
    try {
      await Promise.all([refetchWeather(), refetchForecast()]);
    } catch (error) {
      toast.show({
        description: "Refresh failed. Please try again.",
        placement: "top",
      });
    }
  };

  // Handle API errors
  useEffect(() => {
    if (isWeatherError || isForecastError) {
      setError("Unable to load weather data. Please check your connection.");
      toast.show({
        description: "Failed to load weather data. Pull down to refresh.",
        placement: "top",
        duration: 3000,
      });
    } else {
      setError(null);
    }
  }, [isWeatherError, isForecastError]);

  if (isLoadingWeather || isLoadingForecast) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <LinearGradient
          colors={["#4287f5", "#42a1f5"]}
          style={StyleSheet.absoluteFillObject}
        />
        <Spinner size="lg" color="white" />
      </Box>
    );
  }

  if (error || !currentWeather) {
    return (
      <WeatherLoadError
        error={error}
        handleRefresh={handleRefresh}
        handleBackToSearch={handleBackToSearch}
      />
    );
  }

  return (
    <Box flex={1}>
      <LinearGradient
        colors={["#4287f5", "#42a1f5"]}
        style={StyleSheet.absoluteFillObject}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: Math.max(insets.left, 16),
            paddingRight: Math.max(insets.right, 16),
          },
        ]}
      >
        <VStack space={6} flex={1} paddingBottom={60}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Pressable onPress={handleBackToSearch} style={styles.backButton}>
              <Icon
                as={MaterialCommunityIcons}
                name="arrow-left"
                size={6}
                color="white"
              />
            </Pressable>

            <View style={styles.locationContainer}>
              <Icon
                as={MaterialCommunityIcons}
                name="map-marker"
                size={6}
                color="white"
                style={styles.locationIcon}
              />
              <Text
                color="white"
                fontSize="lg"
                fontWeight="semibold"
                numberOfLines={2}
                style={styles.locationText}
              >
                {locationDisplay}
              </Text>
            </View>

            <IconButton
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="refresh"
                  size={6}
                  color="white"
                />
              }
              onPress={handleRefresh}
              style={styles.refreshButton}
            />
          </View>

          <MainWeatherDisplay currentWeather={currentWeather} />

          <WeatherDetails currentWeather={currentWeather} />

          {forecast && <WeatherForecast forecast={forecast} />}
        </VStack>
      </ScrollView>
    </Box>
  );
}
