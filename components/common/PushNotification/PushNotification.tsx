import React, {useEffect, useRef} from 'react';
import {getMessaging, MessagePayload, onMessage} from 'firebase/messaging';
import {firebaseCloudMessaging} from '../../../utils/firebase';
import Toast from '../Toast/Toast';
import {useToggle} from '@hooks';

function PushNotificationLayout({children}: any) {
  const {state: notify, handlers: notifyHandler} = useToggle();
  const message = useRef<MessagePayload>({} as MessagePayload);
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
    const messaging = getMessaging();
    onMessage(messaging, (payload: MessagePayload) => {
      if (payload) {
        message.current = payload;
        notifyHandler.on();
      }
    });
  }

  return (
    <>
      <Toast
        onClose={notifyHandler.off}
        variant="copySuccess"
        isOpen={notify}
        text={message.current.notification?.title ?? ''}
        body={message.current.notification?.body}
      />
      {children}
    </>
  );
}

export default PushNotificationLayout;
