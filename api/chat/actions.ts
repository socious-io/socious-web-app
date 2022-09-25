import {post} from 'utils/request';
import {FindChatBody} from '@models/chat';

export function findChat(participantsId: FindChatBody) {
  return post<any>('/chats/find', participantsId);
}
