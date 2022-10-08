import React, {useCallback, useEffect, useRef, useState} from 'react';
import AddPost from './AddPost';
import {Modal, Button} from '@components/common';
import {useToggle} from '@hooks';
import {Avatar} from '@components/common';
import {ChevronLeftIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {uploadMedia} from '@api/media/actions';
import {createPost} from '@api/posts/actions';
import {CreatePostBodyType} from '@models/post';

// validations
import {useForm, FormProvider} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {schemaCreatePost} from '@api/posts/validation';
import PostCreateStep1 from '@components/common/Post/Create/Step1/PostCreateStep1';
import PostCreateStep2 from '@components/common/Post/Create/Step2/PostCreateStep2';
import PostContainer from './PostContainer';

// Types
export interface InsertNewPost {
  setNewPost: (post: any) => void;
}

const MainContent = () => {
  const {state: addPostState, handlers: addPostHandlers} = useToggle();
  const {state: likeState, handlers: likeHandlers} = useToggle();
  const [file, setFile] = useState<any>(null);
  const formMethodsStep1 = useForm({resolver: joiResolver(schemaCreatePost)});
  const {getValues, setValue} = formMethodsStep1;
  const [step, setStep] = useState<number>(1);
  const addPost = useRef<InsertNewPost>(null);

  const resetCreatePostForm = useCallback(() => {
    addPostHandlers.off();
    setStep(1);
    setValue('causes_tags', null);
    setValue('content', null);
    setFile(null);
  }, [addPostHandlers, setValue]);

  const onCreatePost = useCallback(async () => {
    let media = null;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res: any = await uploadMedia(formData);
        media = [res.id];
      } catch (error) {
        console.error(error);
        resetCreatePostForm();
        return;
      }
    }
    const content = getValues('content');
    const causes_tags = getValues('causes_tags');
    const link = getValues('link');
    const postBody: CreatePostBodyType = {content, causes_tags: [causes_tags]};
    if (link) postBody.link = link;
    if (media) postBody.media = media;

    try {
      const res = await createPost(postBody);
      addPost?.current?.setNewPost(res);
    } catch (error) {
      console.error(error);
    }
    resetCreatePostForm();
  }, [file, getValues, resetCreatePostForm]);

  const handleSubmit = useCallback(
    (data?: any) => {
      if (step === 1) {
        setStep(step + 1);
      } else {
        onCreatePost();
      }
    },
    [step, onCreatePost],
  );

  return (
    <div className="mb-10 sm:space-y-6">
      <AddPost onClickAdd={addPostHandlers.on} />
      <PostContainer ref={addPost} />
      {/* Like Modal */}
      <Modal isOpen={likeState} onClose={likeHandlers.off}>
        <Modal.Title>
          <h2 className="text-center">Likes</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-8 h-80 overflow-y-auto">
            <div className="flex justify-between border-t-2 py-3">
              <div className="flex items-center">
                <Avatar />
                Clear Me
              </div>
              <Button size="sm">Connect</Button>
            </div>
            <div className="flex justify-between border-t-2 py-3">
              <div className="flex items-center">
                <Avatar />
                Clear Me
              </div>
              <Button size="sm">Connect</Button>
            </div>
          </div>
        </Modal.Description>
      </Modal>

      {/* Add Post Modal */}
      <Modal isOpen={addPostState} onClose={addPostHandlers.off}>
        <span
          className="absolute right-3 cursor-pointer "
          onClick={resetCreatePostForm}
        >
          <XMarkIcon className="w-6" />
        </span>
        {step === 2 && (
          <span
            className="absolute left-3 cursor-pointer"
            onClick={() => setStep(step - 1)}
          >
            <ChevronLeftIcon className="w-6" />
          </span>
        )}
        <FormProvider {...formMethodsStep1}>
          {step === 1 && (
            <PostCreateStep1
              onSubmit={handleSubmit}
              setFile={setFile}
              file={file}
            />
          )}
          {step === 2 && (
            <PostCreateStep2 onSubmit={handleSubmit} file={file} />
          )}
        </FormProvider>
      </Modal>
    </div>
  );
};

export default MainContent;
