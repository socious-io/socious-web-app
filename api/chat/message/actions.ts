import {
  messageBodyType,
  CreateMessageResponseType,
  ReadResponse,
} from '@models/message';
import {post} from 'utils/request';

export function sendMessage(chatId: string, messageBody: messageBodyType) {
  return post<CreateMessageResponseType>(
    `/chats/${chatId}/messages`,
    messageBody,
  );
}

export function readMessage(chatId: string, messageId: string) {
  return post<ReadResponse>(
    `/chats/update/${chatId}/messages/${messageId}/read`,
    {},
  );
}
