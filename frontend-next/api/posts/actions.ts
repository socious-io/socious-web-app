import { post } from 'utils/request';
import { CreatePostBodyType } from '@models/post';

type CreatePostType = (postBody: CreatePostBodyType, currentIdentity: string)  => Promise<any>

export const createPost: CreatePostType = (postBody: CreatePostBodyType, currentIdentity: string) => {
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