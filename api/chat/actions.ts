import {post} from 'utils/request';
import {CreateChatBodyType, FindChatBodyType} from '@models/chat';

export function findChat(participantsId: FindChatBodyType) {
  return post<any>('/chats/find', participantsId);
}

export function createChat(createChatBody: CreateChatBodyType) {
  return post('/chats', createChatBody);
}
