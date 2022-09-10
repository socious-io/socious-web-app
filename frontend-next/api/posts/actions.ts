import { rejects } from 'assert';
import { resolve } from 'path';
import { deleteRequest, post, put } from 'utils/request';
import { CreatePostBodyType } from '@models/post';
 
export function createPost(postBody: CreatePostBodyType) {
    post("/api/v2/posts",
          postBody,
    )
}


// LIKE UNLIKE
export function likePost(id: string, currentIdentity: string) {
    put(`/api/v2/posts/${id}/like`,
        {},
        {
          "Current-Identity": currentIdentity,
        }
    );
}

export function unlikePost(id: string, currentIdentity: string) {
    deleteRequest(`/api/v2/posts/${id}/like`,
                  {
                    "Current-Identity": currentIdentity,
                  }
    );
};