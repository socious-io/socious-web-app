import {messageBodyType, createMessageResponseType} from '@models/chat';
import {post} from 'utils/request';

export function sendMessage(chatId: string, messageBody: messageBodyType) {
  return post<createMessageResponseType>(
    `/chats/${chatId}/messages`,
    messageBody,
  );
}
