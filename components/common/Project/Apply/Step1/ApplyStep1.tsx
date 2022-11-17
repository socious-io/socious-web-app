import React, {FC, useEffect} from 'react';
import {StepProps} from '@models/stepProps';
import {useForm} from 'react-hook-form';
import {TextInput, TextArea, Button, Avatar} from '@components/common';
import {FormLayout} from '../../created/NewProject/Layout';
import {schemaApplyProject} from '@api/projects/validation';
import {joiResolver} from '@hookform/resolvers/joi';
import {useProjectContext} from '../../created/NewProject/context';
import {LinkIcon, PaperClipIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Switch, Checkbox} from '@components/common';
import useSWR from 'swr';
import {get} from 'utils/request';
import {Project} from 'models/project';
import {twMerge} from 'tailwind-merge';
import {ExclamationCircleIcon, PlusIcon} from '@heroicons/react/24/solid';
import {useToggle} from '@hooks';
import {Question} from '@models/question';

export type TFormAnswer = {
  id: string;
  selected_option: number | null;
  answer: string | null;
  required: boolean;
  checkbox: boolean;
};

type CheckBoxesProps = {
  options: string[];
  errorMessage?: string;
  setSelectedOption: (id: number) => void;
  selected: number | null;
};

interface ApplyStep extends StepProps {
  project: Project;
  questions?: Question[];
}
export const TitlePart: FC<{
  title: string;
  className?: string;
}> = ({title, className}) => {
  return (
    <div
      className={twMerge(
        'mt-4 border-y pt-6 pb-4 text-base font-semibold',
        className && className,
      )}
    >
      {title}
    </div>
  );
};

export const CheckBoxes: FC<CheckBoxesProps> = ({
  options,
  errorMessage,
  setSelectedOption,
  selected,
}) => {
  return (
    <div className="space-y-4">
      {options.map((option, i) => (
        <Checkbox
          checked={selected === i + 1}
          key={`option: ${i + 1} - ${option}`}
          label={option}
          onChange={() => setSelectedOption(i + 1)}
          className="h-5 w-5 appearance-none text-primary"
        />
      ))}
      {errorMessage && (
        <div className="flex items-center text-error">
          <ExclamationCircleIcon className="mr-1 h-5 w-5" /> {errorMessage}
        </div>
      )}
    </div>
  );
};

export const ApplyStep1 = ({onSubmit, project, questions}: ApplyStep) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  const {data} = useSWR<any>(`/orgs/${project?.identity_id}`, get);

  const {state: showLinkFields, handlers: linkFieldsHandlers} = useToggle();

  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
    setValue,
    watch,
  } = useForm({
    resolver: joiResolver(schemaApplyProject),
    defaultValues: {
      cover_letter: '',
      cv_name: '',
      cv_link: '',
      answers:
        questions?.map(
          (question) =>
            ({
              id: question.id,
              required: question.required ?? false,
              checkbox: question.options?.length > 0,
              selected_option: null as any,
              answer: null as any,
            } as TFormAnswer),
        ) ?? null,
    },
  });

  useEffect(() => {
    if (ProjectContext?.cover_letter) {
      setValue('cover_letter', ProjectContext.cover_letter, {
        shouldValidate: true,
      });
    } else if (ProjectContext?.cv_name) {
      setValue('cv_name', ProjectContext.cv_name, {
        shouldValidate: true,
      });
    }
    if (ProjectContext?.cv_link) {
      setValue('cv_link', ProjectContext.cv_link, {
        shouldValidate: true,
      });
    }
  }, [ProjectContext, setValue]);

  const handleChange = (field: any, input: string | boolean) => {
    setValue(field, input, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setProjectContext({
      ...ProjectContext,
      [field]: input,
    });
  };

  return (
    <form
      className="flex h-full w-full grow flex-col sm:grow-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLayout type="FULL" className="!grow">
        <div className="hide-scrollbar overflow-y-scroll px-4 pt-4">
          <p className="font-bold text-black">{project?.title}</p>
          <div className="mt-3 flex flex-row space-x-2">
            <Avatar size="s" type="organizations" />
            <p className="text-black">{data?.name}</p>
          </div>
          <p className="mt-4 text-black">{project?.description}</p>
          <TitlePart
            title="Cover letter"
            className="-mx-4 border-b-0 px-4 text-xl"
          />
          <TextArea
            required
            label="Message"
            placeholder="Write a message..."
            rows={5}
            value={ProjectContext.cover_letter}
            containerClassName="mt-6"
            className="border-gray border-1  overflow-y-scroll focus:border-none"
            errorMessage={errors?.['cover_letter']?.message}
            onChange={(e) => handleChange('cover_letter', e.target.value)}
          />

          <div>
            <TitlePart
              title="Resume"
              className="-mx-4 border-b-0 px-4 text-xl"
            />
            {!ProjectContext.attachment?.type && (
              <>
                <p className="text-black">Upload your resume</p>
                <p className="mb-4 text-graySubtitle">DOC, DOCX, PDF (10MB)</p>
              </>
            )}
          </div>

          <div className="flex space-x-4 sm:-mt-2">
            {/* Upload Media IF FILE NOT SELECTED */}
            {!ProjectContext.attachment?.type && (
              <Button
                onClick={() =>
                  setProjectContext({
                    ...ProjectContext,
                    formStep: 2,
                  })
                }
                className="flex h-9 w-36 items-center justify-center p-0"
                type="button"
                variant="outline"
                leftIcon={() => <LinkIcon width={20} height={20} />}
              >
                Upload File
              </Button>
            )}
          </div>
          {ProjectContext.attachment?.type && (
            <div className="flex items-center space-x-2">
              <PaperClipIcon className="w-5" />
              <span>{ProjectContext.attachment.name}</span>
              <div
                className="rounded-full border p-2 text-primary"
                onClick={() =>
                  setProjectContext({
                    ...ProjectContext,
                    attachment: null,
                  })
                }
              >
                <TrashIcon className="w-5" />
              </div>
            </div>
          )}

          <div className="">
            <TitlePart title="Link" className="-mx-4 border-b-0 px-4 text-xl" />
            {!showLinkFields ? (
              <Button
                onClick={() => linkFieldsHandlers.on()}
                className="flex h-9 w-36 items-center justify-center p-0"
                type="button"
                variant="outline"
                leftIcon={() => <PlusIcon width={20} height={20} />}
              >
                Add a link
              </Button>
            ) : (
              <>
                <div className="mt-2 space-y-4 pl-0 ">
                  <TextInput
                    label="Link name"
                    placeholder="Link name"
                    className="border-gray border-1  overflow-y-scroll focus:border-none"
                    errorMessage={errors?.['cv_name']?.message}
                    onChange={(e) => handleChange('cv_name', e.target.value)}
                  />
                </div>
                <div className="mt-2 space-y-4 pl-0 ">
                  <TextInput
                    label="Link URL"
                    placeholder="Link url"
                    className="border-gray border-1  overflow-y-scroll focus:border-none"
                    errorMessage={errors?.['cv_link']?.message}
                    onChange={(e) => handleChange('cv_link', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          {(questions?.length ?? 0) > 0 && (
            <div>
              <TitlePart
                title="Screening questions"
                className="-mx-4 border-b-0 px-4 text-xl"
              />
              <div className="mt-4 space-y-7">
                {questions?.map((question, index) => (
                  <div key={question.id} className="space-y-2">
                    <p>
                      {index + 1}. {question.question}{' '}
                      {question.required && (
                        <span className="text-error">*</span>
                      )}
                    </p>
                    {question.options?.length > 0 ? (
                      <CheckBoxes
                        options={question.options}
                        errorMessage={
                          (errors?.answers as any)?.[index]?.selected_option
                            ?.message
                        }
                        selected={watch(`answers.${index}.selected_option`)}
                        setSelectedOption={(optionId) =>
                          setValue(`answers.${index}.selected_option`, optionId)
                        }
                      />
                    ) : (
                      <TextArea
                        register={register(`answers.${index}.answer`)}
                        errorMessage={
                          (errors?.answers as any)?.[index]?.answer?.message
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <TitlePart
            title="Contact info"
            className="-mx-4 border-b-0 px-4 text-xl"
          />

          <div className="mb-4 flex w-full flex-row  justify-between">
            <div>Share contact information with Organization?</div>
            <Switch
              onChange={(c) => handleChange('share_contact_info', c)}
              value={ProjectContext.share_contact_info}
            />
          </div>
          <div className="-mx-4 flex items-end justify-center border-t p-4 pb-12">
            <Button
              disabled={isSubmitting}
              className="flex h-11 w-full items-center justify-center"
              type="submit"
              variant="fill"
              value="Submit"
            >
              Submit application
            </Button>
          </div>
        </div>
      </FormLayout>
    </form>
  );
};
