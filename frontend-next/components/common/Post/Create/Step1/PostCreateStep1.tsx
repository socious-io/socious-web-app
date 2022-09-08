import React, { useEffect, useRef } from 'react';
import Modal from '@components/common/Modal/Modal';
import Combobox from '@components/common/Combobox/Combobox';
import { StepProps } from '@models/stepProps';
import { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import Avatar from '@components/common/Avatar/Avatar';
import TextArea from '@components/common/TextArea/TextArea';
import ImageUploader from '@components/common/ImageUploader/ImageUploader';
import Button from '@components/common/Button/Button';
import { CameraIcon, LinkIcon, PhotographIcon } from '@heroicons/react/outline';
import useUser from 'hooks/useUser/useUser';
import InputFiled from '@components/common/InputFiled/InputFiled';
import TextInput from '@components/common/TextInput/TextInput';
import { useToggle } from '@hooks';

interface PostCreateStepProps extends StepProps {
  setFile: React.Dispatch<React.SetStateAction<any>>,
}

const PostCreateStep1 = ({onSubmit, setFile}: PostCreateStepProps) => {
  const [selected, setSelected] = useState<string>("");
  const { user} = useUser();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);

  const {state: showLinkBox, handlers: linkHandler} = useToggle();

  const formMethods = useFormContext();
  const {handleSubmit, setValue, formState, register} = formMethods;
  
  const onSelected = useCallback((selectedItem) => {
    setSelected(selectedItem);
    setValue('causes_tags', selectedItem.name, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [setValue])


  const showCamera = useCallback(async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if (videoRef?.current) videoRef.current.srcObject = stream; 
  }, [])

  const clickPhoto = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if ((videoRef?.current) && (canvaRef?.current !== null)) {
      (canvaRef.current.getContext('2d')?.drawImage(videoRef.current, 0, 0, canvaRef.current.width, canvaRef.current.height));
      let file: any = null;
      canvaRef.current.toBlob(function(blob) {
        if (blob) file = new File([blob], 'test.png', { type: 'image/png' }, );
        setFile(() => file);
      }, 'image/png');
    }
  }, [setFile])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Title>
          <h2 className="text-center">Create post</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2 space-y-8">
            <div className='flex items-center space-x-3 -ml-6 -mr-6 border-[#C3C8D9] border-y-[0.5px] p-4'>
              <Avatar src={user?.avatar?.url} size="m" />
              <Combobox 
                selected={selected}
                onSelected={onSelected}
                items={[
                  {id: 1, name: "MINORITY"},
                  {id: 2, name: "DIVERSITY_INCLUSION"},
                  {id: 3, name: "INDIGENOUS_PEOPLES"},
                  {id: 4, name: "DISABILITY"},
                ]}
                errorMessage={formState?.errors?.['causes_tags']?.message}
                required
                className="w-full"
                placeholder="social causes"
              />
              </div>
            <TextArea
              placeholder='I feel like......'
              rows={12}
              containerClassName=" -mr-5 -ml-5"
              className='focus:border-none'
              errorMessage={formState?.errors?.['content']?.message}
              register={register("content")}
              />
          </div>
        </Modal.Description>
        <Modal.Description>
          {false &&
            <div>
              <div className='flex '>
                <video className="basis-1" id="video" ref={videoRef} autoPlay></video>
                <canvas className="basis-1" id="canvas" ref={canvaRef}></canvas>
              </div>
              <button id="click-photo" onClick={clickPhoto}>Click Photo</button>
            </div>
          }
        </Modal.Description>
        <div className='flex justify-between items-center bg-offWhite py-2 border-grayLineBased border-y-2 -mr-6 -ml-6 mt-3'>
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
                register={register("link")}
                errorMessage={formState?.errors?.['link']?.message}
              />

            }

          </div> */}
          <span></span>
          <div className='flex items-center'>
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
                className="max-w-xs mr-auto flex items-center justify-center align-middle bg-transparent p-2"
                size="lg"
                variant="ghost"
                onClick={setOpen}
                >
                  <PhotographIcon className="w-5"/>
                </Button>
              )}
            </ImageUploader>
          </div>
        </div>
        <Button
          className="max-w-xs ml-auto flex items-center justify-center align-middle mt-4 "
          type="submit"
          // size="lg"
          variant="fill"
          value="Submit"
          >
          Create Post
        </Button>
      </form>
  );
};

export default PostCreateStep1;