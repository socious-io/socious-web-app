export type MessageBodyType = {
  text: string;
  media?: string;
};

export interface CreateMessageResponseType {
  chat_id: string;
  created_at: string;
  deleted_at: string | null;
  id: string;
  identity_id: string;
  media: null | string;
  replied: boolean;
  reply_id: string | null;
  text: string;
  updated_at: string;
}

export type ReadResponse = {message: 'success'};

export interface MessageType extends CreateMessageResponseType {
  media_url: string | null;
}
