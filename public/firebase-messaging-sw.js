import {initializeApp} from "firebase/app";
import {getMessaging, onBackgroundMessage} from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyA11IaAlKkmRuV4FSe3mVgaIlGNSyUrkP8',
  authDomain: 'social-network-dbc4f.firebaseapp.com',
  projectId: 'social-network-dbc4f',
  storageBucket: 'social-network-dbc4f.appspot.com',
  messagingSenderId: '876088547885',
  appId: '1:876088547885:web:a129d2199a77258bb236a4',
  measurementId: 'G-PGTGQXSNST',
});

const messaging = getMessaging(firebaseApp);

//background notifications will be received here

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
