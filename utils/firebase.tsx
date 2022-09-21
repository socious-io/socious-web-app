import 'firebase/messaging';
import firebase from 'firebase/app';
import {getDevices, saveDeviceToken} from '@api/devices/actions';
import {DeviceBody, DeviceToken} from '@models/devices';
//import localforage from 'localforage';

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
      });

      try {
        const messaging = firebase.messaging();
        //console.log(messaging);
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken();
          const tokenInDB = await getDevices();
          const deviceToken = tokenInDB.find(
            (token: DeviceToken) =>
              token.meta?.os === 'WEBAPP' && token.token === fcm_token,
          );

          if (deviceToken?.token) {
            return deviceToken.token;
          } else {
            const device: DeviceBody = {
              token: fcm_token,
              meta: {
                os: 'WEBAPP',
              },
            };
            const res = await saveDeviceToken(device);
            if (res.token) {
              return fcm_token;
            }
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export {firebaseCloudMessaging};
