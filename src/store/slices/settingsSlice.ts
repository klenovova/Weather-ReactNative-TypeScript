import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

interface SettingsState {
  temperatureUnit: TemperatureUnit;
}

const initialState: SettingsState = {
  temperatureUnit: 'celsius',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
    },
  },
});

export const { setTemperatureUnit } = settingsSlice.actions;
export default settingsSlice.reducer; 