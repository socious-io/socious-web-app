import {getMessaging, getToken} from 'firebase/messaging';
import {initializeApp} from 'firebase/app';
import {getDevices, saveDeviceToken} from '@api/devices/actions';
import {DeviceBody, DeviceToken} from '@models/devices';
import {Capacitor} from '@capacitor/core';

const firebaseCloudMessaging = {
  init: async () => {
    // Initialize the Firebase app with the credentials
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    });

    try {
      // const messaging = getMessaging(app);
      // if ('Notification' in window && !Capacitor.isNativePlatform()) {
      //   const status = await Notification.requestPermission();
      //   if (status && status === 'granted') {
      //     // Get new token from Firebase
      //     const fcm_token = await getToken(messaging, {
      //       vapidKey: process.env.NEXT_PUBLIC_FIREBASE_PUSH_CERT,
      //     });
      //     const tokenInDB = await getDevices();
      //     const deviceToken = tokenInDB.find(
      //       (token: DeviceToken) =>
      //         token.meta?.os === 'WEBAPP' && token.token === fcm_token,
      //     );
      //     if (deviceToken?.token) {
      //       return deviceToken.token;
      //     } else {
      //       const device: DeviceBody = {
      //         token: fcm_token,
      //         meta: {
      //           os: 'WEBAPP',
      //         },
      //       };
      //       const res = await saveDeviceToken(device);
      //       if (res.token) {
      //         return fcm_token;
      //       }
      //     }
      //   }
      // }
    } catch (error) {
      console.error('FCM error: ', error);
      return null;
    }
  },
};

// export {firebaseCloudMessaging};
