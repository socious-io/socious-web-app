/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {FC, useState, useEffect, useRef} from 'react';

import profile_img_icon from 'asset/images/user.png';

interface ImageUploaderProps {
  src?: string;
  onChange: (file: any) => void;
  children?: any;
  withPreview?: boolean;
}

const onImageError = (ev: any) => {
  ev.target.src = profile_img_icon;
};
export const ImageUploader: FC<ImageUploaderProps> = ({
  src,
  onChange,
  children,
  withPreview = true,
}: ImageUploaderProps) => {
  const inputRef: any = useRef(null);

  const [imagePreviewUrl, setImagePreviewUrl]: any = useState(src);
  useEffect(() => {
    setImagePreviewUrl(src);
  }, [src]);

  const OnChange = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target?.files[0];
    if (file) {
      onChange(file);
      reader.onloadend = () => {
        // onChange(file);

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
      <div className={`relative ${withPreview && "max-w-[15rem]"}`}>
        <div className="ui-component-img-uploader-edit">
          <input
            onChange={OnChange}
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            ref={inputRef}
          />
        </div>
        {
          withPreview && 
            <div className="ui-component-img-uploader-preview">
              <img src={imagePreviewUrl} onError={onImageError} />
            </div>
        }
      </div>
      {children(handleChooseMedia)}
    </>
  );
};

export default ImageUploader;
