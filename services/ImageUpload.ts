import {uploadMedia} from '@api/media/actions';

export const checkAndUploadMedia = async (
  file: any,
): Promise<string | null> => {
  let returnId: string | null = null;
  if (typeof file === 'string') {
    // File is ID. i.e. No change in Image
    returnId = file;
  } else if (file?.type) {
    // Image upload feature is not working.
    const formData = new FormData();
    formData.append('file', file);
    try {
      const mediaRes: any = await uploadMedia(formData);
      returnId = mediaRes?.id;
    } catch (error: any) {
      throw error;
    }
  }
  return returnId;
};
