import {IdentityType} from './identity';

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

export interface IPost {
  id: string;
  content: string;
  identity_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  causes_tags: string[] | string;
  hashtags: string;
  identity_tags: string;
  old_id: number;
  media: {id: string; url: string}[] | null;
  likes: number;
  shared: number;
  shared_id: string;
  search_tsv: string;
  identity_type: IdentityType;
  identity_meta: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    status: string;
    username: string;
    image: string;
    shortname: string;
  };
  liked: boolean;
  shared_post: any;
  shared_from_identity: {
    meta: string;
  };
}
