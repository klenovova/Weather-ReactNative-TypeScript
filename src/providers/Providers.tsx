import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NativeBaseProvider, extendTheme } from '@gluestack-ui/themed-native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/src/store';

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          {children}
        </NativeBaseProvider>
      </PersistGate>
    </ReduxProvider>
  );
}; 