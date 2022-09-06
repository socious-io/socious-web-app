import { post } from "utils/request";


export function uploadMedia(formData: FormData) {
  return new Promise((resolve: (response: any) => void, reject) => {
    post("/api/v2/media/upload",
          formData,
          {
            "Content-Type": "multipart/form-data",
          }
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
  });
}