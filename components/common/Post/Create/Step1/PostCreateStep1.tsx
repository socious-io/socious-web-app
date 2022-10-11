import React, {useRef} from 'react';
import Modal from '@components/common/Modal/Modal';
import {StepProps} from '@models/stepProps';
import {useFormContext, useController, FieldValues} from 'react-hook-form';
import TextArea from '@components/common/TextArea/TextArea';
import Button from '@components/common/Button/Button';
import useUser from 'hooks/useUser/useUser';
import {useToggle} from '@hooks';
import CausesTagBar from '../../CausesTagBar/CausesTagBar';
import PostActionBar from '../../PostActionBar/PostActionBar';

interface PostCreateStepProps extends StepProps {
  setFile: React.Dispatch<React.SetStateAction<any>>;
  file: any;
}

const PostCreateStep1 = ({onSubmit, setFile, file}: PostCreateStepProps) => {
  const {user, currentIdentity} = useUser();
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, getValues} = formMethods;
  const causesTagsController = useController<FieldValues, string>({
    name: 'causes_tags',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex grow flex-col sm:grow-0"
    >
      <Modal.Title>
        <h2 className="font-worksans text-center">Create post</h2>
      </Modal.Title>
      <div className="flex h-auto grow flex-col sm:block">
        <div className="mt-2 grow space-y-8 sm:grow-0">
          <CausesTagBar
            type={currentIdentity?.type}
            src={
              currentIdentity?.type === 'users'
                ? currentIdentity?.meta?.avatar
                : currentIdentity?.meta?.image
            }
            controller={causesTagsController}
          />
          <TextArea
            placeholder="I feel like......"
            rows={12}
            containerClassName=" -mr-5 -ml-5"
            className="focus:border-none"
            errorMessage={formState?.errors?.['content']?.message}
            register={register('content')}
          />
        </div>
        <PostActionBar
          fileExist={!!file}
          register={register('link')}
          errorMessage={formState?.errors?.['link']?.message}
          setFile={setFile}
        />
      </div>
      <div className="mt-4 hidden md:block">
        <Button
          className="float-right max-w-xs px-12"
          type="submit"
          size="md"
          variant="fill"
          value="Submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default PostCreateStep1;
