import React from 'react';
import { Box, VStack, HStack, Switch, Text, Heading, Icon, Pressable, Divider, ScrollView, Link } from '@gluestack-ui/themed-native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setTemperatureUnit } from '@/src/store/slices/settingsSlice';
import type { TemperatureUnit } from '@/src/store/slices/settingsSlice';
import { SettingItem } from '@/components/settings/SettingsItem';
import { ExternalLink } from '@/components/ExternalLink';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle: string;
  isChecked: boolean;
  onToggle: () => void;
}

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const temperatureUnit = useAppSelector((state) => state.settings.temperatureUnit);

  const toggleTemperatureUnit = () => {
    const newUnit: TemperatureUnit = temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    dispatch(setTemperatureUnit(newUnit));
  };

  return (
    <Box flex={1} bg="gray.50" safeArea>
      <ScrollView>
        <VStack space={6} p={6}>
          <VStack space={1}>
            <Heading size="xl" color="gray.800">
              Settings
            </Heading>
            <Text color="gray.500" fontSize="md">
              Customize your weather app experience
            </Text>
          </VStack>

          <VStack
            bg="white"
            rounded="2xl"
            shadow="2"
            space={0}
            divider={<Divider />}
            p={4}
          >
            <SettingItem
              icon="temperature-celsius"
              title="Temperature Unit"
              subtitle={`Currently using ${
                temperatureUnit === 'celsius' ? 'Celsius (°C)' : 'Fahrenheit (°F)'
              }`}
              isChecked={temperatureUnit === 'fahrenheit'}
              onToggle={toggleTemperatureUnit}
            />
          </VStack>

          <Box bg="white" rounded="2xl" shadow="2" p={6}>
            <VStack space={3}>
              <HStack alignItems="center" space={2}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="information-outline"
                  size={5}
                  color="primary.500"
                />
                <Text fontSize="md" fontWeight="semibold" color="gray.700">
                  About
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                Weather App v1.0.0
              </Text>
              <Text fontSize="sm" color="gray.500">
                Data provided by <ExternalLink href="https://openweathermap.org">OpenWeather</ExternalLink>
              </Text>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
} 