import {
  MessageBodyType,
  CreateMessageResponseType,
  ReadResponse,
} from '@models/message';
import {post} from 'utils/request';

export function sendMessage(chatId: string, messageBody: MessageBodyType) {
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
