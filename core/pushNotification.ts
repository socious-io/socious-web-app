import {FCM} from '@capacitor-community/fcm';
import {PushNotifications} from '@capacitor/push-notifications';

async function requestPermissions() {
  await PushNotifications.requestPermissions();
  await PushNotifications.register();

  FCM.subscribeTo({topic: 'test'})
    .then((r) => console.log(`subscribed to topic`))
    .catch((err) => console.log(err));

  // Unsubscribe from a specific topic
  FCM.unsubscribeFrom({topic: 'test'})
    .then(() => console.log(`unsubscribed from topic`))
    .catch((err) => console.log(err));

  // Get FCM token instead the APN one returned by Capacitor
  FCM.getToken()
    .then((r) => console.log(`Token ${r.token}`))
    .catch((err) => console.log(err));

  // Remove FCM instance
  FCM.deleteInstance()
    .then(() => console.log(`Token deleted`))
    .catch((err) => console.log(err));

  // Enable the auto initialization of the library
  FCM.setAutoInit({enabled: true}).then(() => console.log(`Auto init enabled`));

  // Check the auto initialization status
  FCM.isAutoInitEnabled().then((r) => {
    console.log('Auto init is ' + (r.enabled ? 'enabled' : 'disabled'));
  });
}

export {requestPermissions};
