import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {FindChatBody} from '@models/chat';
import {findChat} from '@api/chat/actions';
import {GridLoader} from 'react-spinners';

const ChatCreate = () => {
  const router = useRouter();
  const {uid} = router.query;

  console.table({uid, name});

  useEffect(() => {
    if (!uid) return;
    // router.push('/app/chat');
    const toFindChat: FindChatBody = {
      participants: [uid as string],
    };
    findChat(toFindChat)
      .then((response) => {
        console.log('RESPONSE of CHECK', response);
        // IF chat exists,
        if (response.items.length !== 0) {
          // Redirect_to chat
          router.push(`/app/chat/${response.items?.[0].id}`);
        }
        // If no chat
        // Create new chat
      })
      .catch((error) => console.log('ERROR', error));
  }, [router, uid]);

  // 6b108a14-a496-4f4d-b1c1-70dcd262f39c CMHC org
  // a505d9b6-97cb-4784-a586-3067d73dbdcc bohorababin1@gmail.com
  return (
    <div className="flex h-full w-full items-center justify-center">
      <GridLoader color="#36d7b7" />
    </div>
  );
};

export default ChatCreate;
