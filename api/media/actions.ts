import {post} from 'utils/request';

export function uploadMedia(formData: FormData) {
  return post('/media/upload', formData, {
    'Content-Type': 'multipart/form-data',
  });
}
