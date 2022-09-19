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
        apiKey: 'AIzaSyA11IaAlKkmRuV4FSe3mVgaIlGNSyUrkP8',
        authDomain: 'social-network-dbc4f.firebaseapp.com',
        projectId: 'social-network-dbc4f',
        storageBucket: 'social-network-dbc4f.appspot.com',
        messagingSenderId: '876088547885',
        appId: '1:876088547885:web:a129d2199a77258bb236a4',
      });

      try {
        const messaging = firebase.messaging();
        //console.log(messaging);
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken();
          // const tokenInDB = await getDevices();
          // const deviceToken = tokenInDB.find(
          //   (token: DeviceToken) =>
          //     token.meta?.os === 'WEBAPP' && token.token === fcm_token,
          // );

          // if (deviceToken?.token) {
          //   return deviceToken.token;
          // } else {
          //   const device: DeviceBody = {
          //     token: fcm_token,
          //     meta: {
          //       os: 'WEBAPP',
          //     },
          //   };
          //   const res = await saveDeviceToken(device);
          //   if (res.token) {
          //     return fcm_token;
          //   }
          // }
          return fcm_token;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export {firebaseCloudMessaging};
