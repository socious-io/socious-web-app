import {ImageUploader, Button, TextInput} from '@components/common';
import {CameraIcon, LinkIcon, PhotoIcon} from '@heroicons/react/24/outline';
import {XCircleIcon, XMarkIcon} from '@heroicons/react/24/solid';
import {useToggle} from '@hooks';
import {useCallback, useRef} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

interface PostActionBarProps {
  register: UseFormRegisterReturn;
  errorMessage: any;
  setFile: (file: any) => void;
  fileExist: boolean;
}

export const PostActionBar = ({
  register,
  errorMessage,
  setFile,
  fileExist,
}: PostActionBarProps) => {
  // const stream = useRef<MediaStream | null>(null);
  // const {state: showLinkBox, handlers: linkHandler} = useToggle();
  // const {state: cameraState, handlers: cameraHandler} = useToggle();

  // const videoRef = useRef<HTMLVideoElement>(null);
  // const canvaRef = useRef<HTMLCanvasElement>(null);

  // const toggleCamera = useCallback(async () => {
  //   cameraHandler.toggle();
  //   if (cameraState || stream.current) {
  //     cameraHandler.off();
  //     stream.current = null;
  //   } else {
  //     stream.current = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: false,
  //     });
  //     if (videoRef?.current) videoRef.current.srcObject = stream.current;
  //   }
  // }, [cameraHandler, cameraState]);

  // const clickPhoto = useCallback(
  //   async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     e.preventDefault();
  //     if (videoRef?.current && canvaRef?.current !== null) {
  //       canvaRef.current
  //         .getContext('2d')
  //         ?.drawImage(
  //           videoRef.current,
  //           0,
  //           0,
  //           canvaRef.current.width,
  //           canvaRef.current.height,
  //         );
  //       let file: any = null;
  //       canvaRef.current.toBlob(function (blob) {
  //         if (blob) file = new File([blob], 'test.png', {type: 'image/png'});
  //         setFile(() => file);
  //       }, 'image/png');
  //     }
  //     cameraHandler.off();
  //   },
  //   [cameraHandler, setFile],
  // );

  return (
    <div className="sm:-ml-6 sm:-mr-6">
      {/* {cameraState && (
        <div className="absolute bottom-0 left-0 mb-48 max-h-20 sm:relative">
          <div className="relative z-10 flex">
            <video
              className="basis-1"
              id="video"
              ref={videoRef}
              autoPlay
            ></video>
            <canvas className="basis-1" id="canvas" ref={canvaRef}></canvas>
          </div>
          <Button
            id="click-photo"
            className="absolute top-0 z-10 m-4"
            onClick={clickPhoto}
          >
            Click Photo
          </Button>
        </div>
      )} */}
      <div className="fixed bottom-0 left-0 mt-3 flex w-full items-center justify-between border-y-2 border-grayLineBased bg-offWhite py-2 sm:static">
        {/* Link Button */}
        {/* <div className="relative p-2">
          <Button
            className="bg-transparent p-2"
            variant="ghost"
            onClick={linkHandler.toggle}
          >
            <LinkIcon className="w-5" />
          </Button>
          {showLinkBox && (
            <TextInput
              containerClassName="absolute bottom-full "
              className="w-30 min-w-20 border-grayLinedBased focus:border-grayLinedBased rounded-none px-1 py-0"
              register={register}
              errorMessage={errorMessage}
            />
          )}
        </div> */}
        <span></span>
        <div className="flex items-center">
          {/* Camera Button */}
          {/* <Button
            className="mr-auto flex max-w-xs items-center justify-center bg-transparent p-2 align-middle"
            size="lg"
            variant="ghost"
            onClick={() => toggleCamera()}
          >
            <CameraIcon className="w-5" />
          </Button> */}
          <span></span>
          <ImageUploader onChange={setFile} withPreview={false}>
            {(setOpen: any) => (
              <div className="relative">
                {fileExist && (
                  <XCircleIcon
                    className="absolute top-0 right-0 w-5 cursor-pointer text-graySubtitle hover:text-rose-600"
                    onClick={() => setFile(null)}
                  />
                )}
                <Button
                  className="mr-auto flex max-w-xs items-center justify-center bg-transparent p-2 align-middle"
                  size="lg"
                  variant="ghost"
                  onClick={setOpen}
                >
                  <PhotoIcon className="w-5" />
                </Button>
              </div>
            )}
          </ImageUploader>
        </div>
      </div>
    </div>
  );
};

export default PostActionBar;
