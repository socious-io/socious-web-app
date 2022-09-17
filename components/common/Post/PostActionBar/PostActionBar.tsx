import {ImageUploader, Button, TextInput} from '@components/common';
import {CameraIcon, LinkIcon, PhotoIcon} from '@heroicons/react/24/outline';
import {useToggle} from '@hooks';
import {useCallback, useRef} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

interface PostActionBarProps {
  register: UseFormRegisterReturn;
  errorMessage: any;
  setFile: (file: any) => void;
}

export const PostActionBar = ({
  register,
  errorMessage,
  setFile,
}: PostActionBarProps) => {
  const {state: showLinkBox, handlers: linkHandler} = useToggle();
  // const { state: cameraState, handlers: cameraHandler } = useToggle();

  // const videoRef = useRef<HTMLVideoElement>(null);
  // const canvaRef = useRef<HTMLCanvasElement>(null);

  // const showCamera = useCallback(async () => {
  //   cameraHandler.on();
  //   let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  //   if (videoRef?.current) videoRef.current.srcObject = stream;
  // }, [cameraHandler]);

  // const clickPhoto = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if ((videoRef?.current) && (canvaRef?.current !== null)) {
  //     (canvaRef.current.getContext('2d')?.drawImage(videoRef.current, 0, 0, canvaRef.current.width, canvaRef.current.height));
  //     let file: any = null;
  //     canvaRef.current.toBlob(function(blob) {
  //       if (blob) file = new File([blob], 'test.png', { type: 'image/png' }, );
  //       setFile(() => file);
  //     }, 'image/png');
  //   };
  // }, [setFile]);

  return (
    <>
      {/* {cameraState &&
            <div>
              <div className='flex '>
                <video className="basis-1" id="video" ref={videoRef} autoPlay></video>
                <canvas className="basis-1" id="canvas" ref={canvaRef}></canvas>
              </div>
              <button id="click-photo" onClick={clickPhoto}>Click Photo</button>
            </div>
          } */}
      <div className="-mr-6 -ml-6 mt-3 flex items-center justify-between border-y-2 border-grayLineBased bg-offWhite py-2">
        {/* Link Button */}
        {/* <div className='p-2 relative'>
          <Button
            className='bg-transparent p-2'
            variant="ghost"
            onClick={linkHandler.toggle}
            >
            <LinkIcon className='w-5' />
          </Button>
          { showLinkBox &&
            <TextInput
            containerClassName='absolute bottom-full '
            className='w-30 min-w-20 rounded-none px-1 py-0 border-grayLinedBased focus:border-grayLinedBased'
            register={register}
            errorMessage={errorMessage}
            />
          }
        </div> */}
        <span></span>
        <div className="flex items-center">
          {/* Camera Button */}
          {/* <Button
            className="max-w-xs mr-auto flex items-center justify-center align-middle bg-transparent p-2"
            size="lg"
            variant="ghost"
            onClick={() => showCamera()}
            >
              <CameraIcon className="w-5"/>
          </Button> */}
          <span></span>
          <ImageUploader onChange={setFile} withPreview={false}>
            {(setOpen: any) => (
              <Button
                className="mr-auto flex max-w-xs items-center justify-center bg-transparent p-2 align-middle"
                size="lg"
                variant="ghost"
                onClick={setOpen}
              >
                <PhotoIcon className="w-5" />
              </Button>
            )}
          </ImageUploader>
        </div>
      </div>
    </>
  );
};

export default PostActionBar;
