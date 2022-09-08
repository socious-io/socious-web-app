import { CreateCommentType } from '@models/comment';
import { deleteRequest, post, put } from 'utils/request';

export function createComment(commentBody: CreateCommentType, postId: string) {
    return post(`/api/v2/posts/${postId}/comments`,
                        commentBody,
                      )
};

export function onLikedComment(postId: string, commentId: string) {
  return put(`/api/v2/posts/${postId}/comments/${commentId}/like`, {});
};

export function onUnlikedComment(postId: string, commentId: string) {
  return deleteRequest(`/api/v2/posts/${postId}/comments/${commentId}/like`);
}
