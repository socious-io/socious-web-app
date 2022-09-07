import React, { useCallback, useEffect, useState } from 'react';
import AddPost from './AddPost';
import Posts from './Posts';
import { Modal, Button } from "@components/common"
import { useToggle } from '@hooks';
import {TextArea, Avatar} from '@components/common';
import Combobox from '@components/common/Combobox/Combobox';
import useUser from 'hooks/useUser/useUser';
import { CameraIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import ImageUploader from '@components/common/ImageUploader/ImageUploader';
import { uploadMedia } from '@api/media/actions';
import {createPost} from "@api/posts/actions"
import { CreatePostType } from '@models/post';
// validations

import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schemaCreatePost } from '@api/posts/validation';
import PostCreateStep1 from '@components/common/Post/Create/Step1/PostCreateStep1';
import PostCreateStep2 from '@components/common/Post/Create/Step2/PostCreateStep2';


const MainContent = () => {
  const {state: addPostState, handlers: addPostHandlers} = useToggle();
  const {state: likeState, handlers: likeHandlers} = useToggle();
  const [file, setFile] = useState<any>(null);
  const formMethodsStep1 = useForm({resolver: joiResolver(schemaCreatePost)});
  const { getValues, setValue } = formMethodsStep1;
  const [step, setStep] = useState<number>(1);


  const resetCreatePostForm = useCallback(() => {
    addPostHandlers.off();
    setStep(1);
    setValue("causes_tags", null);
    setValue("content", null);
    setFile(null);
  }, [addPostHandlers, setValue])
  
  const onCreatePost = useCallback(async (e?: any) => {
    // e?.preventDefault();
    let media = null
    if (file) {
      const formData = new FormData;
      formData.append("file", file);
      try {
        const res = await uploadMedia(formData)
        media = [res.id]
      } catch (error) {
        console.error(error);
        resetCreatePostForm();
        return;
      }
    }
    
    const content = getValues('content');
    const causes_tags = getValues('causes_tags');
    console.table({causes_tags, content});
    let postBody: CreatePostType = { content, causes_tags}
    if (media) postBody.media = media
    console.log("Post Body", postBody);
    try {
      const response = await createPost(postBody);
      console.log("response ---> ", response);
      resetCreatePostForm();
    } catch(error) {
      console.log(error);
    }
    resetCreatePostForm();
  }, [file, getValues, resetCreatePostForm])
  
  const handleSubmit = useCallback((data?: any) => {
    if (step === 1) {
      setStep(step + 1);
    } else {
      console.log("Here I am");
      onCreatePost();
    }
  }, [step, onCreatePost])

  

  return (
    <div className="w-full mb-10 space-y-6">
      <AddPost onClickAdd={addPostHandlers.on}/>
      <Posts />
      {/* Like Modal */}
      <Modal isOpen={likeState} onClose={likeHandlers.off}>
        <Modal.Title>
          <h2 className="text-center">Likes</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2 h-80 overflow-y-auto mt-8">
            <div className='flex justify-between border-t-2 py-3'>
              <div className='flex items-center'>
                <Avatar />
                Clear Me
              </div>
              <Button size='sm'>
                Connect
              </Button>
            </div>
            <div className='flex justify-between border-t-2 py-3'>
              <div className='flex items-center'>
                <Avatar />
                Clear Me
              </div>
              <Button size='sm'>
                Connect
              </Button>
            </div>
          </div>
        </Modal.Description>
      </Modal>

      {/* Add Post Modal */}
      <Modal isOpen={addPostState} onClose={addPostHandlers.off}>
        <span className='absolute right-3 cursor-pointer ' onClick={resetCreatePostForm}>
          <XIcon className='w-6' />
        </span>
        {step === 2 && 
          <span
           className='absolute left-3 cursor-pointer'
           onClick={() => setStep(step - 1)}
          >
            <ChevronLeftIcon className='w-6' />
          </span>
        }
        <FormProvider {...formMethodsStep1}>
          {step === 1 && <PostCreateStep1 onSubmit={handleSubmit} setFile={setFile}/>}
          {step ===2 && <PostCreateStep2 onSubmit={handleSubmit} file={file}/>}
        </FormProvider>
      </Modal>
    </div>
  );
};

export default MainContent;