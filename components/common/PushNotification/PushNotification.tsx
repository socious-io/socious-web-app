import React, {useEffect} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import {firebaseCloudMessaging} from '../../../utils/firebase';
import {ToastContainer, toast} from 'react-toastify';

function PushNotificationLayout({children}: any) {
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log('set Token======>', token);
          getMessage();
          //getBackground();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  function getMessage() {
    const messaging = firebase.messaging();
    messaging.onMessage((message) => {
      toast(
        <div>
          <h5>{message?.notification?.title}</h5>
          <h6>{message?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        },
      );
    });
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;
