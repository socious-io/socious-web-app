import TextArea from '@components/common/TextArea/TextArea';
import {useFormContext} from 'react-hook-form';
import {Button} from '@components/common';
import {PlusCircleIcon} from '@heroicons/react/24/outline';
import {FC} from 'react';
import {TProjectInput} from '../sharedType';

const QuestionDetail: FC<TProjectInput> = ({setFormStep}) => {
  const formMethods = useFormContext();
  const {
    register,
    formState: {errors},
  } = formMethods;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-4 my-4">
        <TextArea
          label="Question"
          placeholder="Question"
          register={register('question', {
            required: 'This field is required',
            maxLength: 3,
          })}
          errorMessage={errors?.['title']?.message}
          className="my-3"
          required
          rows={4}
        />
        <div>Require this question to be answered</div>
      </div>
      <div className="flex h-full w-full flex-col bg-zinc-200">
        <div className="flex items-center justify-center">
          <Button
            // onClick={}
            variant="outline"
            size="lg"
            className="my-4 flex w-11/12 items-center justify-start bg-white font-semibold"
            leftIcon={() => (
              <PlusCircleIcon width={20} height={20} color="#000000" />
            )}
          >
            <div>Add choice</div>
          </Button>
        </div>
      </div>
      <div className="flex h-20 items-end justify-end p-4">
        <Button
          onClick={setFormStep}
          type="button"
          className="'flex h-11 w-36 items-center justify-center"
        >
          Add
        </Button>

        <Button
          onClick={setFormStep}
          variant="outline"
          type="button"
          className="ml-2 flex h-11 w-36 items-center justify-center"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuestionDetail;
