export type CreatePostBodyType = {
  content: string;
  media?: string[];
  hashtags?: string[];
  causes_tags: string[];
  identity_tags?: string[];
  link?: string;
}