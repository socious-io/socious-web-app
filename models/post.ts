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
