// import {FCM} from '@capacitor-community/fcm';
import {SWRConfig} from 'swr';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {get} from 'utils/request';
import '../asset/css/global.css';
import '../styles/index.css';
import '../styles/bottom-sheet.css';
import '../styles/App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';

// const subToNotifs = () => {
//   // now you can subscribe to a specific topic
//   FCM.subscribeTo({topic: 'test'})
//     .then((r) => console.log(`subscribed to topic`))
//     .catch((err) => console.log(err));

//   // Unsubscribe from a specific topic
//   FCM.unsubscribeFrom({topic: 'test'})
//     .then(() => console.log(`unsubscribed from topic`))
//     .catch((err) => console.log(err));

//   // Get FCM token instead the APN one returned by Capacitor
//   FCM.getToken()
//     .then((r) => console.log(`Token ${r.token}`))
//     .catch((err) => console.log(err));

//   // Remove FCM instance
//   FCM.deleteInstance()
//     .then(() => console.log(`Token deleted`))
//     .catch((err) => console.log(err));

//   // Enable the auto initialization of the library
//   FCM.setAutoInit({enabled: true}).then(() => console.log(`Auto init enabled`));

//   // Check the auto initialization status
//   FCM.isAutoInitEnabled().then((r) => {
//     console.log('Auto init is ' + (r.enabled ? 'enabled' : 'disabled'));
//   });
// };

function MyApp({Component, pageProps}: AppProps) {
  // useEffect(() => {
  //   const onInit = () => {
  //     PushNotifications.requestPermissions().then((result) => {
  //       if (result.receive === 'granted') {
  //         PushNotifications.register();
  //         console.log('granted');
  //       } else {
  //         // Show some error
  //         console.log('error');
  //       }
  //     });
  //     PushNotifications.addListener('registration', (token: Token) => {
  //       console.log('Push registration success, token: ' + token.value);
  //     });
  //     PushNotifications.addListener('registrationError', (error: any) => {
  //       console.log('Error on registration: ' + JSON.stringify(error));
  //     });
  //     PushNotifications.addListener(
  //       'pushNotificationReceived',
  //       (notification: PushNotificationSchema) => {
  //         console.log('Push received: ' + JSON.stringify(notification));
  //       },
  //     );
  //     PushNotifications.addListener(
  //       'pushNotificationActionPerformed',
  //       (notification: ActionPerformed) => {
  //         console.log('Push action performed: ' + JSON.stringify(notification));
  //       },
  //     );
  //   };
  //   Capacitor.isNativePlatform() && onInit();
  // }, []);

  return (
    <>
      <Head>
        <title>Socious</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      {/* @ts-ignore */}
      <SWRConfig
        value={{
          fetcher: get,
          onError: (error) => {
            if (
              error?.response?.status === 400 ||
              (500 &&
                error?.response?.data?.error?.startsWith(
                  'invalid input syntax for type uuid',
                ))
            )
              return toast.error(error?.response?.data?.message);
          },
        }}
      >
        {/* <PushNotification> */}
        <Component {...pageProps} />
        {/* </PushNotification> */}
      </SWRConfig>
      <ToastContainer />
    </>
  );
}

export default MyApp;
