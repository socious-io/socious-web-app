import { post } from 'utils/request';
import { CreatePostBodyType, SharePostBodyType } from '@models/post';

// type CreatePostType = (postBody: CreatePostBodyType, currentIdentity: string)
export function createPost(postBody: CreatePostBodyType, currentIdentity: string) {
    return post("/api/v2/posts", postBody,
                {
                  "Current-Identity": currentIdentity,
                }
              )
}

export function sharePost(postBody: SharePostBodyType, postId: string) {
  return post(`/api/v2/posts/${postId}/share`, postBody);
}