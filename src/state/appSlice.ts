import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  musicFile: string | null;
  weatherData: any | null;
  acknowledgedRain: boolean;
}

const initialState: AppState = {
  musicFile: null,
  weatherData: null,
  acknowledgedRain: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMusicFile: (state, action) => {
      state.musicFile = action.payload;
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setAcknowledgedRain: (state, action) => {
      state.acknowledgedRain = action.payload;
    },
  },
});

export const { setMusicFile, setWeatherData, setAcknowledgedRain } =
  appSlice.actions;

export default appSlice.reducer;
