import { post, get } from 'utils/request';

export function uploadMedia(formData: FormData) {
  return post('/media/upload', formData, {
    'Content-Type': 'multipart/form-data',
  });
}

export function downloadMedia(media_url: string) {
  return get(media_url);
}
