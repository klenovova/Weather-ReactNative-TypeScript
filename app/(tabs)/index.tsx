import React, { useState, useEffect } from 'react';
import { Box, VStack, Icon, IconButton, Text, Pressable, Center, useToast } from '@gluestack-ui/themed-native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  StyleSheet, 
  Keyboard, 
  TouchableWithoutFeedback, 
  TextInput, 
  View,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSearchCitiesQuery } from '@/src/store/api/weatherApi';
import type { CitySearchResult } from '@/src/store/api/weatherApi';
import * as Location from 'expo-location';

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  // Debounce search text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const { 
    data: searchResults, 
    isFetching: isSearching,
    isError: isSearchError,
    error: searchError
  } = useSearchCitiesQuery(debouncedSearch, {
    skip: debouncedSearch.length < 3,
  });

  // Handle API errors
  useEffect(() => {
    if (isSearchError) {
      setError('Unable to search cities. Please try again.');
      // Optional: Show toast for error
      toast.show({
        description: 'Search failed. Please check your connection.',
        placement: 'top',
        duration: 3000,
      });
    } else {
      setError(null);
    }
  }, [isSearchError]);

  const handleCitySelect = (city: CitySearchResult) => {
    Keyboard.dismiss();
    setSearchText('');
    router.push({
      pathname: '/(tabs)/weather',
      params: { 
        lat: city.lat, 
        lon: city.lon,
        cityName: city.name,
        countryCode: city.country,
        stateName: city.state || ''
      }
    });
  };

  const handleLocationPress = async () => {
    try {
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      
      if (existingStatus === 'denied') {
        Alert.alert(
          'Location Access Required',
          'Please enable location access in your device settings to see weather for your current location.',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Open Settings',
              onPress: () => {
                Platform.OS === 'ios'
                  ? Linking.openURL('app-settings:')
                  : Linking.openSettings();
              }
            }
          ]
        );
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toast.show({
          description: 'Permission to access location was denied',
          placement: 'top',
          duration: 3000,
        });
        return;
      }

      router.push('/(tabs)/weather');
    } catch (error) {
      toast.show({
        description: 'Error accessing location services',
        placement: 'top',
        duration: 3000,
      });
    }
  };

  const renderSearchResults = () => {
    if (!searchText || searchText.length < 3) {
      return null;
    }

    return (
      <View style={styles.resultsOuterContainer}>
        {isSearching ? (
          <View style={styles.messageContainer}>
            <ActivityIndicator color="white" size="small" />
            <Text color="white" fontSize="sm" ml={2}>
              Searching...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.messageContainer}>
            <MaterialCommunityIcons 
              name="cloud-off-outline" 
              size={20} 
              color="white" 
            />
            <Text color="white" fontSize="sm" ml={2}>
              {error}
            </Text>
          </View>
        ) : !searchResults || searchResults.length === 0 ? (
          <View style={styles.messageContainer}>
            <MaterialCommunityIcons 
              name="alert-circle-outline" 
              size={20} 
              color="white" 
            />
            <Text color="white" fontSize="sm" ml={2}>
              No cities found
            </Text>
          </View>
        ) : (
          <ScrollView 
            style={styles.resultsScrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {searchResults.map((city, index) => (
              <Pressable
                key={`${city.lat}-${city.lon}`}
                onPress={() => handleCitySelect(city)}
              >
                <View style={[
                  styles.resultItem,
                  index !== searchResults.length - 1 && styles.resultItemBorder
                ]}>
                  <View style={styles.resultIconContainer}>
                    <MaterialCommunityIcons 
                      name="map-marker" 
                      size={20} 
                      color="white" 
                    />
                  </View>
                  <View style={styles.resultTextContainer}>
                    <Text color="white" fontSize="md" fontWeight="semibold">
                      {city.name}
                    </Text>
                    <Text color="rgba(255,255,255,0.7)" fontSize="sm">
                      {[city.state, city.country].filter(Boolean).join(', ')}
                    </Text>
                  </View>
                  <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={20} 
                    color="rgba(255,255,255,0.5)" 
                  />
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1}>
          <LinearGradient
            colors={['#4287f5', '#42a1f5']}
            style={StyleSheet.absoluteFillObject}
          />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <Box 
              flex={1} 
              pt={insets.top + 20}
              px={6}
            >
              {/* Logo/Title Section */}
              <Center mb={12}>
                <Icon 
                  as={MaterialCommunityIcons}
                  name="weather-partly-cloudy"
                  size={16}
                  color="white"
                />
                <Text color="white" fontSize="3xl" fontWeight="bold">
                  Weather App
                </Text>
              </Center>

              {/* Search Section */}
              <VStack space={4} width="100%">
                <View style={styles.searchContainer}>
                  <MaterialCommunityIcons 
                    name="magnify" 
                    size={24} 
                    color="white" 
                    style={styles.searchIcon}
                  />
                  <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search city..."
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    style={styles.input}
                    autoCapitalize="words"
                    keyboardAppearance="dark"
                  />
                  {isSearching && (
                    <ActivityIndicator color="white" style={styles.searchButton} />
                  )}
                </View>

                {renderSearchResults()}

                {/* Current Location Button */}
                <Pressable 
                  onPress={handleLocationPress}
                  android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {({ isPressed }: { isPressed: boolean }) => (
                    <Box
                      bg="rgba(255,255,255,0.2)"
                      p={4}
                      rounded="lg"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        transform: [{
                          scale: isPressed ? 0.98 : 1
                        }]
                      }}
                    >
                      <Icon
                        as={MaterialCommunityIcons}
                        name="crosshairs-gps"
                        size={6}
                        color="white"
                        mr={2}
                      />
                      <Text color="white" fontSize="md" fontWeight="semibold">
                        Use Current Location
                      </Text>
                    </Box>
                  )}
                </Pressable>
              </VStack>
            </Box>
          </ScrollView>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    height: '100%',
    ...Platform.select({
      ios: {
        padding: 15,
      },
      android: {
        padding: 10,
      },
    }),
  },
  searchButton: {
    padding: 8,
    marginLeft: 8,
  },
  resultsOuterContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 4,
    maxHeight: 400,
  },
  resultsScrollView: {
    maxHeight: 400,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  resultItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  resultIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultTextContainer: {
    flex: 1,
  },
});
