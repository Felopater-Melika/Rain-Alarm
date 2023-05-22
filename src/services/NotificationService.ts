import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

let notificationListener: { remove: () => void } | null = null;
let responseListener: { remove: () => void } | null = null;

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  // eslint-disable-next-line prefer-const
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export async function scheduleNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: { seconds: 2 },
  });
}

export function startListening() {
  notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log(notification);
    },
  );

  responseListener = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log(response);
    },
  );
}

export async function scheduleAlarm(
  trigger: Date,
  soundName: string,
): Promise<void> {
  const oneHourBefore = new Date(trigger.getTime() - 60 * 60 * 1000);
  await Notifications.scheduleNotificationAsync({
    content: {
      sound: soundName,
    },
    trigger: oneHourBefore,
  });
}

export function stopListening() {
  if (notificationListener) {
    Notifications.removeNotificationSubscription(notificationListener);
  }
  if (responseListener) {
    Notifications.removeNotificationSubscription(responseListener);
  }
}
