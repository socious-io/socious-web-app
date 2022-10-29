import {IdentityType, MetaWithAddress} from './identity';

export type CreateCommentType = {
  content: string;
  reply_id?: string;
};

export interface IComment {
  id: string;
  identity_id: string;
  post_id: string;
  content: string;
  reply_id: string | null;
  replied: boolean;
  created_at: string;
  updated_at: string;
  likes: number;
  liked: boolean;
  identity_meta: MetaWithAddress;
  identity_type: IdentityType;
}
