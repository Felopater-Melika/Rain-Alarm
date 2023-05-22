import * as Notifications from 'expo-notifications';
import NotificationService from '../../src/services/NotificationService';

jest.mock('expo-notifications');

describe('NotificationService', () => {
  let notificationService: NotificationService;
  const mockSubscription = {
    remove: jest.fn(),
  };

  beforeEach(() => {
    notificationService = new NotificationService();
    (
      Notifications.addNotificationReceivedListener as jest.Mock
    ).mockReturnValue(mockSubscription);
    (
      Notifications.addNotificationResponseReceivedListener as jest.Mock
    ).mockReturnValue(mockSubscription);
  });

  it('requests notification permissions when existing status is not granted', async () => {
    const mockPermissionsNotGranted = { status: 'notGranted' };
    const mockPermissionsGranted = { status: 'granted' };
    const mockToken = { data: 'token' };
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue(
      mockPermissionsNotGranted,
    );
    (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue(
      mockPermissionsGranted,
    );
    (Notifications.getExpoPushTokenAsync as jest.Mock).mockResolvedValue(
      mockToken,
    );

    await notificationService.registerForPushNotificationsAsync();

    expect(Notifications.getPermissionsAsync).toHaveBeenCalled();
    expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
    expect(Notifications.getExpoPushTokenAsync).toHaveBeenCalled();
  });

  it('generates a notification token', async () => {
    const mockToken = { data: 'token' };
    (Notifications.getExpoPushTokenAsync as jest.Mock).mockResolvedValue(
      mockToken,
    );

    const token = await notificationService.registerForPushNotificationsAsync();

    expect(Notifications.getExpoPushTokenAsync).toHaveBeenCalled();
    expect(token).toBe(mockToken.data);
  });

  it('schedules a notification', async () => {
    const title = 'title';
    const body = 'body';

    await notificationService.scheduleNotification(title, body);

    expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
      content: {
        title,
        body,
      },
      trigger: { seconds: 2 },
    });
  });

  it('receives a notification', () => {
    notificationService.startListening();

    expect(Notifications.addNotificationReceivedListener).toHaveBeenCalled();
    expect(
      Notifications.addNotificationResponseReceivedListener,
    ).toHaveBeenCalled();
  });

  it('stops listening to notifications', () => {
    notificationService.startListening();
    notificationService.stopListening();

    expect(Notifications.removeNotificationSubscription).toHaveBeenCalledTimes(
      2,
    );
    expect(Notifications.removeNotificationSubscription).toHaveBeenCalledWith(
      mockSubscription,
    );
  });

  it('should schedule an alarm one hour before the trigger time', async () => {
    const trigger = new Date();
    const soundName = 'alarm.mp3';

    await notificationService.scheduleAlarm(trigger, soundName);

    const oneHourBefore = new Date(trigger.getTime() - 60 * 60 * 1000);
    expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
      content: {
        sound: soundName,
      },
      trigger: oneHourBefore,
    });
  });
});
