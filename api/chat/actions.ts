import {messageBodyType, createMessageResponseType} from '@models/message';
import {post} from 'utils/request';

export function sendMessage(chatId: string, messageBody: messageBodyType) {
  return post<createMessageResponseType>(
    `/chats/${chatId}/messages`,
    messageBody,
  );
}
