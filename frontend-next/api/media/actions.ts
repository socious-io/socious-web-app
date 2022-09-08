import { post } from "utils/request";

export function uploadMedia(formData: FormData) {
  return post("/api/v2/media/upload", formData,
                {
                  "Content-Type": "multipart/form-data",
                }
            );
};