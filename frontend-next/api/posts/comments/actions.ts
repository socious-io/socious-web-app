import { CreateCommentType } from '@models/comment';
import { deleteRequest, post, put } from 'utils/request';

export function createComment(commentBody: CreateCommentType, postId: string) {
  return new Promise((resolve: (response: any) => void, reject) =>
    post(`/api/v2/posts/${postId}/comments`,
          commentBody,
    ).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    })
  );
};

export function onLikedComment(postId: string, commentId: string) {
  return new Promise((resolve: (response: any) => void, reject) =>
    put(`/api/v2/posts/${postId}/comments/${commentId}/like`, {})
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      })
  );
};

export function onUnlikedComment(postId: string, commentId: string) {
  return new Promise((resolve: (response: any) => void, reject) =>
    deleteRequest(`/api/v2/posts/${postId}/comments/${commentId}/like`)
  )
}
