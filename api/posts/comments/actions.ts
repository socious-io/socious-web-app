import {CreateCommentType} from '@models/comment';
import {deleteRequest, post, put} from 'utils/request';

export function createComment(commentBody: CreateCommentType, postId: string) {
  return post(`/posts/${postId}/comments`, commentBody);
}

export function onLikedComment(postId: string, commentId: string) {
  return put(`/posts/${postId}/comments/${commentId}/like`, {});
}

export function onUnlikedComment(postId: string, commentId: string) {
  return deleteRequest(`/posts/${postId}/comments/${commentId}/like`);
}
