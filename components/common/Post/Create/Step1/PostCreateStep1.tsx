import React, { useRef } from 'react';
import Modal from '@components/common/Modal/Modal';
import { StepProps } from '@models/stepProps';
import { useFormContext } from 'react-hook-form';
import TextArea from '@components/common/TextArea/TextArea';
import Button from '@components/common/Button/Button';
import useUser from 'hooks/useUser/useUser';
import { useToggle } from '@hooks';
import CausesTagBar from '../../CausesTagBar/CausesTagBar';
import PostActionBar from '../../PostActionBar/PostActionBar';

interface PostCreateStepProps extends StepProps {
  setFile: React.Dispatch<React.SetStateAction<any>>,
}

const PostCreateStep1 = ({onSubmit, setFile}: PostCreateStepProps) => {
  const { user} = useUser();
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, getValues} = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Title>
          <h2 className="text-center font-worksans">Create post</h2>
        </Modal.Title>
        <Modal.Description>
          <div className="mt-2 space-y-8">
            <CausesTagBar 
              src={user?.avatar?.url}
              register={register("causes_tags")}
              preSelected={getValues("causes_tags")}
              errorMessage={formState?.errors?.['causes_tags']?.message}
            />
            <TextArea
              placeholder='I feel like......'
              rows={12}
              containerClassName=" -mr-5 -ml-5"
              className='focus:border-none'
              errorMessage={formState?.errors?.['content']?.message}
              register={register("content")}
              />
          </div>
          <PostActionBar
            register={register('link')}
            errorMessage={formState?.errors?.['link']?.message}
            setFile={setFile}
          />
        </Modal.Description>
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