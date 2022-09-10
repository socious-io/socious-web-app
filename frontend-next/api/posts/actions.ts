import { deleteRequest, post, put } from 'utils/request';
import { CreatePostBodyType } from '@models/post';
 
export function createPost(postBody: CreatePostBodyType) {
  return post("/api/v2/posts",
        postBody,
  );
}


// LIKE UNLIKE
export function likePost(id: string, currentIdentity: string) {
  return put(`/api/v2/posts/${id}/like`, {});
}

export function unlikePost(id: string, currentIdentity: string) {
  return deleteRequest(`/api/v2/posts/${id}/like`);
};