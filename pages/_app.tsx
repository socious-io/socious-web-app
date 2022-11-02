// import {Web3ReactProvider} from '@web3-react/core';
// import Web3 from 'web3';
import {SWRConfig} from 'swr';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {WalletProvider} from '../context/useWalletContext';
import {get} from 'utils/request';
import PushNotification from '@components/common/PushNotification/PushNotification';
import '../asset/css/global.css';
import '../styles/index.css';
import '../styles/bottom-sheet.css';
import '../styles/App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import {useEffect} from 'react';
import {Capacitor} from '@capacitor/core';
// function getLibrary(provider: any) {
//   return new Web3(provider);
// }

function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    const onInit = () => {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          PushNotifications.register();
        } else {
          // Show some error
        }
      });

      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
      });

      PushNotifications.addListener('registrationError', (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          console.log('Push received: ' + JSON.stringify(notification));
        },
      );

      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        },
      );
    };

    Capacitor.isNativePlatform() && onInit();
  }, []);

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
        <PushNotification>
          <Component {...pageProps} />
        </PushNotification>
      </SWRConfig>
      <ToastContainer />
    </>
  );
}

export default MyApp;
