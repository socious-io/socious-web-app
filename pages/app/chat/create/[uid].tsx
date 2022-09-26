import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {CreateChatBodyType, FindChatBodyType} from '@models/chat';
import {createChat, findChat} from '@api/chat/actions';
import {GridLoader} from 'react-spinners';

const ChatCreate = () => {
  const router = useRouter();
  const {uid, name} = router.query;

  const [status, setStatus] = useState<string>('CHECKING FOR YOUR CHAT...');

  useEffect(() => {
    if (!uid) router.push('/app/chat');

    (async () => {
      const toFindChat: FindChatBodyType = {
        participants: [uid as string],
      };

      try {
        const foundChats = await findChat(toFindChat);

        // IF CHAT EXISTS
        if (foundChats.items.length !== 0) {
          // REDIRECT TO EXISTING CHAT
          router.push(`/app/chat/${foundChats.items?.[0].id}`);
        } else {
          // IF NO CHAT EXISTS
          setStatus('I see. Have a great conversation.');
          const chatBody: CreateChatBodyType = {
            participants: [uid as string],
            type: 'CHAT',
            name: (name as string) || 'nameless',
          };

          // CREATE NEW CHAT
          const chatResponse: any = await createChat(chatBody);
          router.push(`/app/chat/${chatResponse.id}`);
        }
      } catch (error) {
        router.push('/app/chat');
      }
    })();
  }, [name, router, uid]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <GridLoader color="#36d7b7" />
      <p>{status}</p>
    </div>
  );
};

export default ChatCreate;
