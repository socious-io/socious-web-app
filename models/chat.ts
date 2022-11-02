import {TInfiniteResponse} from 'hooks/useInfiniteSWR/useInfiniteSWR';
import {IdentityMeta, IdentityType} from './identity';

export interface FindChatBodyType {
  participants: string[];
}

type ChatType = 'CHAT' | 'GROUP' | 'CHANNEL';
type ParticipantType = 'ADMIN' | 'MEMBER';

export interface CreateChatBodyType {
  name: string;
  description?: string;
  type: ChatType;
  /** UUIDs of participants */
  participants: string[];
}

export interface IChat {
  id: string;
  name: string;
  description: string | null;
  type: ChatType;
  created_by: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
  participants: string[];
  old_id: string | null;
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

export interface IParticipant {
  id: string;
  identity_id: string;
  chat_id: string;
  type: ParticipantType;
  muted_until: string | null;
  joined_by: string;
  last_read_id: string;
  all_read: boolean;
  last_read_at: string;
  created_at: string;
  updated_at: string;
  identity_type: IdentityType;
  identity_meta: IdentityMeta & {
    city?: string;
    address?: string;
    country?: string;
  };
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

export type IParticipantsResponse = TInfiniteResponse<IParticipant>;
