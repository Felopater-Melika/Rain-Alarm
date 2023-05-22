import { setWeatherData } from '../../src/state/appSlice';
import { getWeather } from '../../src/services/WeatherService';
import {
  scheduleNotification,
  scheduleAlarm,
} from '../../src/services/NotificationService';
import { Audio } from 'expo-av';
import checkRain from '../../src/utils/CheckRain';

jest.mock('../../src/services/WeatherService');
jest.mock('../../src/services/NotificationService');
jest.mock('expo-av');
beforeEach(() => {
  jest.resetAllMocks();
});

describe('checkRain', () => {
  it('checks for rain and schedules a notification and alarm if rain is forecast', async () => {
    const mockDispatch = jest.fn();
    const mockWeather = {
      hourly: [{ rain: 0 }, { rain: 1, time: new Date() }],
    };
    const mockMusicFile = 'music.mp3';

    (getWeather as jest.Mock).mockResolvedValue(mockWeather);
    (scheduleNotification as jest.Mock).mockResolvedValue(undefined);
    (scheduleAlarm as jest.Mock).mockResolvedValue(undefined);
    (Audio.Sound.createAsync as jest.Mock).mockResolvedValue({
      sound: { playAsync: jest.fn() },
    });

    await checkRain(false, mockMusicFile, mockDispatch);

    expect(getWeather).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(setWeatherData(mockWeather));
    expect(scheduleNotification).toHaveBeenCalled();
    expect(scheduleAlarm).toHaveBeenCalled();
    expect(Audio.Sound.createAsync).toHaveBeenCalledWith(
      { uri: mockMusicFile },
      { shouldPlay: true },
    );
  });

  it('does not schedule an alarm if rain is acknowledged', async () => {
    const mockDispatch = jest.fn();
    const mockWeather = {
      hourly: [{ rain: 0 }, { rain: 1, time: new Date() }],
    };
    const mockMusicFile = 'music.mp3';

    (getWeather as jest.Mock).mockResolvedValue(mockWeather);
    (scheduleNotification as jest.Mock).mockResolvedValue(undefined);
    (scheduleAlarm as jest.Mock).mockResolvedValue(undefined);
    (Audio.Sound.createAsync as jest.Mock).mockResolvedValue({
      sound: { playAsync: jest.fn() },
    });

    await checkRain(true, mockMusicFile, mockDispatch);

    expect(getWeather).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(setWeatherData(mockWeather));
    expect(scheduleNotification).toHaveBeenCalled();
    expect(scheduleAlarm).not.toHaveBeenCalled();
    expect(Audio.Sound.createAsync).not.toHaveBeenCalled();
  });
});
