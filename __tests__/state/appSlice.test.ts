import appReducer, {
  setMusicFile,
  setWeatherData,
  setAcknowledgedRain,
} from '../../src/state/appSlice';

describe('app reducer', () => {
  it('should handle setMusicFile', () => {
    const initialState = {
      musicFile: null,
      weatherData: null,
      acknowledgedRain: false,
    };
    const state = appReducer(initialState, setMusicFile('file.mp3'));
    expect(state.musicFile).toEqual('file.mp3');
  });

  it('should handle setWeatherData', () => {
    const initialState = {
      musicFile: null,
      weatherData: null,
      acknowledgedRain: false,
    };
    const weatherData = { temperature: 20, rain: true };
    const state = appReducer(initialState, setWeatherData(weatherData));
    expect(state.weatherData).toEqual(weatherData);
  });

  it('should handle setAcknowledgedRain', () => {
    const initialState = {
      musicFile: null,
      weatherData: null,
      acknowledgedRain: false,
    };
    const state = appReducer(initialState, setAcknowledgedRain(true));
    expect(state.acknowledgedRain).toEqual(true);
  });
});
