import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import {FirebaseOptions, initializeApp} from '@firebase/app';
import {
  getMessaging,
  getToken,
  GetTokenOptions,
  Messaging,
} from 'firebase/messaging';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const firebaseInstance = initializeApp(firebaseConfig);

// let messaging!: Messaging;
// try {
//   messaging = getMessaging(firebaseInstance);
// } catch {
//   console.log('messaging error');
// }

const onUserPermissionResponse = (token: string) => {
  return token ? token : null;
};

const onError = (err: Error) => {
  console.warn('an error accrued during firebase permission request: ', err);
  return null;
};

// const askForPermission = async (): Promise<string | null> => {
//   const options: GetTokenOptions = {
//     vapidKey: process.env.NEXT_PUBLIC_FIREBASE_PUSH_CERT,
//   };
//   return getToken(messaging, options)
//     .then(onUserPermissionResponse)
//     .catch(onError);
// };

let run = false;
const requestPushNotificationPermission = () => {
  if (run) {
    return;
  }
  PushNotifications.requestPermissions().then(({receive}) => {
    if (receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      // askForPermission();
      PushNotifications.register();
      console.log('requestPermissions granted');
      run = true;
    } else {
      // No permission for push granted
      console.log('requestPermissions denied');
    }
  });

  PushNotifications.addListener('registration', (token: Token) => {
    console.log('My token: ' + JSON.stringify(token));
  });

  PushNotifications.addListener('registrationError', (error: any) => {
    console.log('Error: ' + JSON.stringify(error));
  });

  PushNotifications.addListener(
    'pushNotificationReceived',
    async (notification: PushNotificationSchema) => {
      console.log('Push received: ' + JSON.stringify(notification));
    },
  );

  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    async (notification: ActionPerformed) => {
      const data = notification.notification.data;
      console.log(
        'Action performed: ' + JSON.stringify(notification.notification),
        data,
      );
    },
  );
};

export {requestPushNotificationPermission};
