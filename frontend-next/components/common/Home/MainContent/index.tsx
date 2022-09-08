import React, { useCallback, useEffect, useState } from 'react';
import AddPost from './AddPost';
import Posts from './Posts';
import { Modal, Button } from "@components/common"
import { useToggle } from '@hooks';
import {TextArea, Avatar} from '@components/common';
import Combobox from '@components/common/Combobox/Combobox';
import useUser from 'hooks/useUser/useUser';
import { CameraIcon } from '@heroicons/react/outline';
import ImageUploader from '@components/common/ImageUploader/ImageUploader';
import { uploadMedia } from '@api/media/actions';
import {createPost} from "@api/posts/actions"
// validations

import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schemaCreatePost } from '@api/posts/validation';
import { CreatePostBodyType } from '@models/post';


const MainContent = () => {
  const {state: addPostState, handlers: addPostHandlers} = useToggle();
  const {state: likeState, handlers: likeHandlers} = useToggle();
  const [selected, setSelected] = useState<string>("");
  const { user } = useUser({onAuthError: false});
  const [file, setFile] = useState<any>(null);
  const {register, handleSubmit, setValue, formState, getValues} = useForm({resolver: joiResolver(schemaCreatePost),});
  

  const resetCreatePostForm = useCallback(() => {
    addPostHandlers.off();
    setValue("causes_tags", null);
    setSelected("");
    setValue("content", null);
    setFile(null)
  }, [addPostHandlers, setValue])
  
  const onCreatePost = useCallback(async (e?: any) => {
    // e?.preventDefault();
    let media = null
    if (file) {
      const formData = new FormData;
      formData.append("file", file);
      try {
        const res: any = await uploadMedia(formData)
        media = [res.id]
      } catch (error) {
        console.error(error);
        return;
      }
    }
    
    const content = getValues('content');
    const causes_tags = getValues('causes_tags');
    console.log("Causes", causes_tags);
    let postBody: CreatePostBodyType = { content, causes_tags}
    if (media) postBody.media = media
    console.log("Post Body", postBody);
    try {
      await createPost(postBody, user.id)
    } catch(error) {
      console.log(error);
    }
    resetCreatePostForm();
  }, [file, getValues, resetCreatePostForm, user?.id])

  const onSelected = useCallback((selectedItem) => {
    setSelected(selectedItem);
    setValue('causes_tags', [selectedItem.name], {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [setValue])

  

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
        <form onSubmit={handleSubmit(onCreatePost)}>

        <Modal.Title>
          <h2 className="text-center">Start Post</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2 space-y-8">
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
              className="flex items-center space-x-3"
              placeholder="social causes"
              label={<Avatar src={user?.avatar}/>}
              />
            <TextArea
              placeholder='I feel like......'
              rows={10}
              errorMessage={formState?.errors?.['content']?.message}
              register={register("content")}
              />
          </div>
        </Modal.Description>
        <Modal.Description>
          {file && file.name}
        </Modal.Description>
        <div className="mt-4 flex justify-between">
          <ImageUploader onChange={setFile} withPreview={false}>
              {(setOpen: any) => (
                <Button
                className="max-w-xs mr-auto flex items-center justify-center align-middle mt-4 "
                size="lg"
                variant="outline"
                onClick={setOpen}
                >
                  <CameraIcon className="w-5"/>
                </Button>
              )}
            </ImageUploader>
          <Button
            className="max-w-xs ml-auto flex items-center justify-center align-middle mt-4 "
            type="submit"
            // size="lg"
            variant="fill"
            value="Submit"
            >
            Create Post
          </Button>
        </div>
        </form>
      </Modal>
    </div>
  );
};

export default MainContent;