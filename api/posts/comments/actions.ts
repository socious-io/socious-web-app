import {CreateCommentType} from '@models/comment';
import {post} from 'utils/request';

export function createComment(commentBody: CreateCommentType, postId: string) {
  return post(`/posts/${postId}/comments`, commentBody);
}

export function onLikedComment(postId: string, commentId: string) {
  return post(`/posts/${postId}/comments/${commentId}/like`);
}

export function onUnlikedComment(postId: string, commentId: string) {
  return post(`/posts/${postId}/comments/${commentId}/unlike`);
}

export function reportComment(commentId: string) {
  return post(`/posts/comments/${commentId}/report`, {
    comment: 'WebappV1 empty comment',
    blocked: false,
  });
}

export function blockComment(commentId: string) {
  return post(`/posts/comments/${commentId}/report`, {
    comment: 'WebappV1 empty comment',
    blocked: true,
  });
}
