import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

class NotificationService {
  private notificationListener: Notifications.Subscription | null;
  private responseListener: Notifications.Subscription | null;

  constructor() {
    this.notificationListener = null;
    this.responseListener = null;
  }

  async registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  async scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "It's going to rain! 🌧️",
        body: 'Remember to take your umbrella!',
      },
      trigger: { seconds: 2 },
    });
  }

  startListening() {
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      },
    );

    this.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
  }

  stopListening() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }
}

export default NotificationService;
