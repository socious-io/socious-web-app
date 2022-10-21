import React, {useEffect, useRef} from 'react';
import {getMessaging, MessagePayload, onMessage} from 'firebase/messaging';
import {firebaseCloudMessaging} from '../../../utils/firebase';
import Toast from '../Toast/Toast';
import {useToggle} from '@hooks';
import {PushNotificationBody} from '@models/notification';
import {OtherIdentityMeta} from '@models/identity';

const getNotificationLink = (
  notification: PushNotificationBody,
): string | null => {
  switch (notification?.data?.type) {
    case 'FOLLOWED':
      const identity: OtherIdentityMeta = JSON.parse(
        notification?.data?.identity,
      );
      return identity?.type === 'organizations'
        ? `/app/organization/${identity?.meta?.shortname}`
        : `/app/user/${identity?.meta?.username}`;
    case 'COMMENT':
    case 'COMMENT_LIKE':
    case 'POST_LIKE':
    case 'SHARE_POST':
      if (notification.data.parentId)
        return `/app/post/${notification.data.parentId}`;
      break;
    case 'APPLICATION':
    case 'SHARE_PROJECT':
      if (notification.data.parentId)
        return `/app/project/${notification.data.parentId}`;
      break;
    default:
      return null;
  }
  return null;
};

function PushNotificationLayout({children}: any) {
  const {state: notify, handlers: notifyHandler} = useToggle();
  const message = useRef<MessagePayload & {link?: string}>(
    {} as MessagePayload,
  );
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event?.data) {
          const link = getNotificationLink(event.data);
          message.current = {...event.data, link};
          notifyHandler.on();
        }
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          // console.log('set Token======>', token);
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
        text={message.current?.notification?.title ?? ''}
        body={message.current?.notification?.body}
        link={message.current?.link}
      />
      {children}
    </>
  );
}

export default PushNotificationLayout;
