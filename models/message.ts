export type messageBodyType = {
  text: string;
};

export interface createMessageResponseType {
  chat_id: string;
  created_at: string;
  deleted_at: string | null;
  id: string;
  identity_id: string;
  media: null | string | any[];
  replied: boolean;
  reply_id: string | null;
  text: string;
  updated_at: string;
}

export interface MessageType extends createMessageResponseType {
  media_url: string | null | any[];
}
