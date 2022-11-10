import {useCallback, useRef} from 'react';

import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
// Validations
import {schemaCreateProjectQuestion} from '@api/projects/validation';

// Components/Icons
import {Button, Checkbox, InputFiled, TextArea} from '@components/common';
import {PlusCircleIcon} from '@heroicons/react/24/outline';
import {ExclamationCircleIcon, TrashIcon} from '@heroicons/react/24/solid';

// Context/Actions
import {useProjectContext} from '../context';

// Types
import {FromLayout} from '../Layout';
import {AddQuestionType} from '@models/project';
export type OptionType = {
  id: number;
  option: string;
};

type QuestionAddProps = {onSubmit: (data: any) => void};

const QuestionDetail = ({onSubmit}: QuestionAddProps) => {
  const {setProjectContext, ProjectContext} = useProjectContext();
  const lastInputRef = useRef<HTMLInputElement | null>(null);
  const {editQuestion} = ProjectContext;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: {errors, isDirty, isValid},
  } = useForm({
    resolver: joiResolver(schemaCreateProjectQuestion),
    defaultValues: {
      question: editQuestion?.question ?? '',
      options: editQuestion?.options?.map((option, index) => ({
        id: index + 1,
        option,
      })),
      required: editQuestion?.required ?? false,
    } as AddQuestionType<OptionType>,
  });

  const options = watch('options');

  const removeItem = useCallback(
    (id: number) => {
      const newOptions =
        options?.filter((option: OptionType, i) => option.id != id) ?? [];
      setValue('options', !!newOptions.length ? newOptions : null, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [options, setValue],
  );

  // Change Text
  const changeAt = useCallback(
    (index: number, value: string) => {
      const newOptions = getValues('options')?.map((item: OptionType) => {
        return item.id == index
          ? {
              ...item,
              option: value,
            }
          : item;
      });
      setValue('options', newOptions, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [getValues, setValue],
  );

  // Increase InputField
  const increaseCount = useCallback(() => {
    if (lastInputRef.current && lastInputRef.current.value === '') return;
    if (!options || options.length < 5)
      setValue(
        'options',
        [
          ...(options ?? []),
          {
            id: Date.now(),
            option: '',
          },
        ],
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
  }, [options, setValue]);

  return (
    <div className="flex h-full w-full flex-col">
      <FromLayout type="FULL" className="!grow">
        <div className="grow overflow-y-scroll">
          <div className="mx-4 my-4">
            <TextArea
              label="Question"
              placeholder="Question"
              register={register('question', {
                required: 'This field is required',
                maxLength: 3,
              })}
              errorMessage={errors?.['question']?.message}
              className="my-3"
              required
              rows={4}
            />
            <Checkbox
              checked={watch('required')}
              className="items-center"
              register={register('required')}
              label="Require this question to be answered"
            />
          </div>
          <div className="flex w-full grow flex-col bg-zinc-200">
            {!!options?.length &&
              options.map((option: OptionType, index: number) => (
                <div key={option.id} className="flex items-center px-4">
                  <InputFiled
                    className="grow py-2 px-4"
                    defaultValue={option.option}
                    ref={
                      options.length === index + 1 ? lastInputRef : undefined
                    }
                    placeholder={`Choice ${index + 1}`}
                    onChange={(e) =>
                      changeAt(
                        option.id,
                        e.currentTarget.value ?? e.target?.value,
                      )
                    }
                    errorMessage={errors?.options?.[index]?.option?.message}
                  />
                  <div onClick={() => removeItem(option.id)}>
                    <TrashIcon className="w-5 text-error" />
                  </div>
                </div>
              ))}
            {errors?.options?.message && (
              <div className="flex items-center py-2 px-6 text-error">
                <>
                  <ExclamationCircleIcon className="mr-1 h-5 w-5" />
                  {errors?.options?.message}
                </>
              </div>
            )}
            <div className="flex items-center justify-center">
              <Button
                onClick={increaseCount}
                variant="outline"
                size="lg"
                className="my-4 flex w-11/12 items-center justify-center bg-white font-semibold"
                leftIcon={() => (
                  <PlusCircleIcon width={20} height={20} color="#000000" />
                )}
              >
                <div>Add choice</div>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-20 items-end justify-end border-t p-4">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty && isValid}
            type="button"
            className="'flex h-11 w-36 items-center justify-center"
          >
            {editQuestion ? 'Update' : 'Add'}
          </Button>

          <Button
            onClick={() =>
              setProjectContext({
                ...ProjectContext,
                formStep: 3,
              })
            }
            variant="outline"
            type="button"
            className="ml-2 flex h-11 w-36 items-center justify-center"
          >
            Cancel
          </Button>
        </div>
      </FromLayout>
    </div>
  );
};

export default QuestionDetail;
