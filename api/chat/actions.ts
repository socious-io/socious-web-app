import {post} from 'utils/request';
import {FindChatBody} from '@models/chat';

export function findChats(chatBody: FindChatBody) {
  return post('/chats', chatBody);
}
