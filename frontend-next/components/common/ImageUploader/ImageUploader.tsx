/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {FC, useState, useEffect, useRef} from 'react';
import {useFormContext, UseFormRegisterReturn, useFormState} from 'react-hook-form';

import profile_img_icon from 'asset/images/user.png';
import { post } from 'utils/request';

interface ImageUploaderProps {
  src: string;
  onChange: (file: any) => void;
  children?: any;
}

const onImageError = (ev: any) => {
  ev.target.src = profile_img_icon;
};
const ImageUploader: FC<ImageUploaderProps> = ({
  src,
  onChange,
  children,
}: ImageUploaderProps) => {
  const inputRef: any = useRef(null);

  const [imagePreviewUrl, setImagePreviewUrl]: any = useState(src);
  useEffect(() => {
    setImagePreviewUrl(src);
  }, [src]);
  const {setValue} = useFormContext();

  const OnChange = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target?.files[0];
    if (!file) return
    setValue("file", file, {
      shouldDirty: true,
      shouldTouch: true
    })
    if (file) {
      reader.onloadend = () => {

        setImagePreviewUrl(reader?.result || '');
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChooseMedia = () => {
    inputRef?.current && inputRef?.current.click();
  };
  return (
    <>
      <div className="relative max-w-[15rem]">
        <div className="ui-component-img-uploader-edit">
          <input
            onChange={OnChange}
            type="file"
            id="imageUpload"
            // accept="image/*"
            accept=".png, .jpg, .jpeg"
            ref={inputRef}
          />
        </div>
        <div className="ui-component-img-uploader-preview">
          <img src={imagePreviewUrl} onError={onImageError} />
        </div>
      </div>
      {children(handleChooseMedia)}
    </>
  );
};

export default ImageUploader;
