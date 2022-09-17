import {
  CreatePostBodyType,
  EditPostBodyType,
  SharePostBodyType,
} from '@models/post';
import {deleteRequest, post, put} from 'utils/request';

export function createPost(postBody: CreatePostBodyType) {
  return post('/posts', postBody);
}

// LIKE UNLIKE
export function likePost(id: string) {
  return put(`/posts/${id}/like`, {});
}

export function unlikePost(id: string) {
  return deleteRequest(`/posts/${id}/like`);
}

export function sharePost(postBody: SharePostBodyType, postId: string) {
  return post(`/posts/${postId}/share`, postBody);
}

export function editPost(postBody: EditPostBodyType, postId: string) {
  return put(`/posts/${postId}`, postBody);
}

export function deletePost(postId: string) {
  return deleteRequest(`/posts/${postId}`);
}
