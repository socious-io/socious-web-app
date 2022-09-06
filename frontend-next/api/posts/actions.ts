import { rejects } from 'assert';
import { resolve } from 'path';
import { deleteRequest, post, put } from 'utils/request';
import { CreatePostType } from '@models/post';
 
export function createPost(postBody: CreatePostType, currentIdentity: string) {
  return new Promise((resolve: (response: any) => void, reject) =>
    post("/api/v2/posts",
          postBody,
          {
            "Current-Identity": currentIdentity,
          }
    ).then((response) => {
      resolve(response);
    }).catch(error => {
      reject(error);
    }) 
  )
}


// LIKE UNLIKE
export function likePost(id: string, currentIdentity: string) {
  return new Promise((resolve: (response: any) => void, reject) => 
    put(`/api/v2/posts/${id}/like`,
        {},
        {
          "Current-Identity": currentIdentity,
        }
    ).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    })

  )
}

export function unlikePost(id: string, currentIdentity: string) {
  return new Promise((resolve: (response: any) => void, reject) => 
    deleteRequest(`/api/v2/posts/${id}/like`,
                  {
                    "Current-Identity": currentIdentity,
                  }
    ).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    })
  )
}