import React from 'react';
import { Stack } from 'expo-router';
import { Providers } from '@/src/providers/Providers';

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
