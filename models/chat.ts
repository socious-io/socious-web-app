import {IdentityMeta} from './identity';

export interface FindChatBodyType {
  participants: string[];
}

type ChatType = 'CHAT' | 'GROUP' | 'CHANNEL';

export interface CreateChatBodyType {
  name: string;
  description?: string;
  type: ChatType;
  /** UUIDs of participants */
  participants: string[];
}

export interface ChatSummaryChat {
  id: string;
  name: string;
  description: string | null;
  type: ChatType;
  created_by: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  participants: Participant[];
  participation: Participation;
  last_message: ChatMessage;
  message_count: string;
  unread_count: string;
}

export interface Participant {
  type: string;
  all_read: boolean;
  last_read_id: string | null;
  last_read_at: string | null;
  identity_type: string;
  identity_meta: IdentityMeta;
}

export interface Participation {
  type: string;
  muted_until: string | null;
  last_read_at: string;
  last_read_id: string;
  all_read: boolean;
}

export interface ChatMessage {
  id: string;
  reply_id: string | null;
  chat_id: string;
  identity_id: string;
  text: string;
  replied: boolean;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  media?: string;
}
