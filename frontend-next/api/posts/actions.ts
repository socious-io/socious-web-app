import { rejects } from 'assert';
import { resolve } from 'path';
import { post } from 'utils/request';
 
export function createPost(postBody: {}, currentIdentity: string) {
  return new Promise((resolve: (response: any) => void, reject) =>
    post("/api/v2/posts",
          postBody,
          {
            "Current-Identity": currentIdentity,
          }
    ).then((response) => {
      resolve(response);
    }).catch(error => {
      rejects(error);
    }) 
  )
}