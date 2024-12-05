# Weather App

A modern weather application built with Expo and React Native that provides real-time weather information and city search functionality.

## Features

- City search with autocomplete suggestions
- Current location weather
- Detailed weather information including:
  - Temperature
  - Feels like temperature
  - Humidity
  - Wind speed
  - Sunrise/Sunset times
- Hourly forecast
- Temperature unit switching (Celsius/Fahrenheit)
- Clean and intuitive UI with smooth animations

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v16 or later)
- npm (v8 or later)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development)
- Android Studio and Android SDK (for Android development)
- Expo Go app on your physical device (optional)

## Environment Setup

### iOS Development (macOS only)
1. Install Xcode from the Mac App Store
2. Install iOS Simulator through Xcode

### Android Development
1. Install Android Studio
2. Install Android SDK (minimum SDK version 21)
3. Configure Android environment variables
4. Create and configure an Android Virtual Device (AVD)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

## Running the App

After starting the development server, you have several options to run the app:

### Using Expo Go (Easiest)
1. Install Expo Go on your iOS/Android device
2. Scan the QR code shown in the terminal with:
   - iOS: Camera app
   - Android: Expo Go app

### Using Simulators
- iOS (macOS only):
  ```bash
  npx expo start --ios
  ```
- Android:
  ```bash
  npx expo start --android
  ```

### Development Build
For a native development build:
```bash
npx expo run:ios
# or
npx expo run:android
```

## Troubleshooting

Common issues and solutions:

1. Metro bundler issues:
   ```bash
   npx expo start --clear
   ```

2. Dependencies issues:
   ```bash
   npm install --force
   ```

3. Cache issues:
   ```bash
   npx expo start --clear-cache
   ```

## Project Structure

```
weather-app/
├── app/                        # Main application screens
│   └── (tabs)/                # Tab-based navigation screens
│       ├── index.tsx          # Search screen
│       ├── weather.tsx        # Weather details screen
│       ├── settings.tsx       # Settings screen
│       └── _layout.tsx        # Tab navigation layout
├── src/
│   ├── store/                 # Redux store configuration       # Store configuration
│   ├── utils/                 # Utility functions
│   └── styles/               # Shared styles
├── components/               # Reusable components
│   ├── weather/             # Weather Screen related components
│   ├── settings/            # Settings Screen related components
└── assets/                 # Static assets
└── constants/              # Constants
```

## Technologies Used

- Expo
- React Native
- TypeScript
- Redux Toolkit
- Gluestack UI
- OpenWeatherMap API


## Video Demo
https://mega.nz/file/kRtXBRKQ#N6YMboMuyxIn_vDt3_3rIZFDcBavo1bHq2rbXj0IzeI
