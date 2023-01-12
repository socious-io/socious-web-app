import {IdentityMeta, IdentityType, MetaWithAddress} from './identity';

export type TSharedFromIdentity = {
  id: string;
  type: IdentityMeta;
  meta: MetaWithAddress;
  created_at: string;
};

interface LoosePostBodyType {
  content?: string;
  media?: string[];
  link?: string;
  hashtags?: string[];
  causes_tags?: string[];
  identity_tags?: string[];
}

export type CreatePostBodyType = {
  content: string;
  media?: string[];
  link?: string;
  hashtags?: string[];
  causes_tags: string[];
  identity_tags?: string[];
};

export type SharePostBodyType = LoosePostBodyType;

export type EditPostBodyType = LoosePostBodyType;

export type ISharedPost = {
  id: string;
  content: string;
  reported: boolean;
  identity_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  causes_tags: string[];
  hashtags: string | null;
  identity_tags: string | null;
  media: [string];
  likes: number;
  liked: boolean;
  shared: number;
  shared_id: string | null;
  old_id: string | null;
  search_tsv: string;
};

export interface IPost extends Omit<ISharedPost, 'media'> {
  media: {id: string; url: string}[] | null;
  identity_type: IdentityType;
  identity_meta: MetaWithAddress;
  shared_post: ISharedPost;
  shared_from_identity: TSharedFromIdentity;
}
