import React, {FC, useEffect, useState} from 'react';
import {StepProps} from '@models/stepProps';
import {useForm} from 'react-hook-form';
import {TextInput, TextArea, Button, Avatar} from '@components/common';
import {FromLayout} from '../../created/NewProject/Layout';
import {schemaApplyProject, schemaLink} from '@api/projects/validation';
import {joiResolver} from '@hookform/resolvers/joi';
import {useProjectContext} from '../../created/NewProject/context';
import {LinkIcon, PaperClipIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Switch} from '@components/common';
import useSWR from 'swr';
import {get} from 'utils/request';
import {Project} from 'models/project';
import {twMerge} from 'tailwind-merge';
import {PlusIcon} from '@heroicons/react/24/solid';
import {useToggle} from '@hooks';

interface ApplyStep extends StepProps {
  project: Project;
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
export const ApplyStep1 = ({onSubmit, project}: ApplyStep) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  const {data} = useSWR<any>(`/orgs/${project?.identity_id}`, get);
  const [name, setName] = useState<string>(' ');
  const [link, setLink] = useState<string>(' ');

  const {state: showLinkFields, handlers: linkFieldsHandlers} = useToggle();

  const {
    formState: {errors: linkErrors},
    setValue: linkSetValue,
  } = useForm({
    resolver: joiResolver(schemaLink),
  });

  const {
    handleSubmit,
    formState: {isValid, errors},
    setValue,
  } = useForm({
    resolver: joiResolver(schemaApplyProject),
  });

  useEffect(() => {
    if (ProjectContext?.cover_letter) {
      setValue('cover_letter', ProjectContext.cover_letter, {
        shouldValidate: true,
      });
    } else if (ProjectContext?.cv_name) {
      linkSetValue('cv_name', ProjectContext.cv_name, {
        shouldValidate: true,
      });
      setName(ProjectContext.cv_name);
    }
    if (ProjectContext?.cv_link) {
      linkSetValue('cv_link', ProjectContext.cv_link, {
        shouldValidate: true,
      });
      setLink(ProjectContext.cv_link);
    }
  }, [ProjectContext, linkSetValue, setValue]);

  const handleChange = (field: string, input: string | boolean) => {
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
      <FromLayout type="FULL">
        <div className="overflow-y-scroll px-4 pt-4">
          <p className="font-bold text-black">{project?.title}</p>
          <div className="mt-3 flex flex-row space-x-2">
            <Avatar size="s" type="organizations" />
            <p className="text-black">{data?.name}</p>
          </div>
          <p className="mt-4 text-black">{project?.description}</p>
          <TitlePart title="Cover letter" />
          <TextArea
            required
            label="Message"
            placeholder="Write a message..."
            rows={5}
            value={ProjectContext.cover_letter}
            containerClassName="mt-6"
            className="border-gray border-1  overflow-y-scroll focus:border-none"
            errorMessage={errors?.['content']?.message}
            onChange={(e) => handleChange('cover_letter', e.target.value)}
          />

          {/* Attachment & Link Section */}
          <TitlePart title="Attach CV" className="border-y-0 sm:hidden" />
          <div className="hidden sm:block">
            <TitlePart title="Resume" className="border-y-0" />
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
                    formStep: 4,
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

            {/* Attach Link. Only for MOBILE */}
            <Button
              onClick={() =>
                setProjectContext({
                  ...ProjectContext,
                  formStep: 3,
                })
              }
              className="flex h-9 w-36 items-center justify-center p-0 sm:hidden"
              type="button"
              variant="outline"
              leftIcon={() => <LinkIcon width={20} height={20} />}
            >
              Attach Link
            </Button>
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

          <div className="hidden sm:block">
            <TitlePart title="Link" className="-mb-2 border-y-0" />
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
                    required
                    label="Link name"
                    placeholder="Link Url"
                    value={name}
                    containerClassName=""
                    className="border-gray border-1  overflow-y-scroll focus:border-none"
                    errorMessage={linkErrors?.['cv_name']?.message}
                    onChange={(e) => {
                      setName(e.target.value);
                      linkSetValue('cv_name', e.target.value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      setProjectContext({
                        ...ProjectContext,
                        ['cv_name']: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="mt-2 space-y-4 pl-0 ">
                  <TextInput
                    required
                    label="Link URL"
                    placeholder="Link url"
                    value={link}
                    containerClassName=""
                    className="border-gray border-1  overflow-y-scroll focus:border-none"
                    errorMessage={linkErrors?.['cv_link']?.message}
                    onChange={(e) => {
                      setLink(e.target.value);
                      linkSetValue('cv_link', e.target.value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      setProjectContext({
                        ...ProjectContext,
                        ['cv_link']: e.target.value,
                      });
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <TitlePart title="Contact info" />

          <div className="my-4 flex w-full flex-row  justify-between">
            <div>Share contact information with Organization?</div>
            <Switch
              onChange={(c) => handleChange('share_contact_info', c)}
              value={ProjectContext.share_contact_info}
            />
          </div>
        </div>
      </FromLayout>
      <div className=" flex items-end justify-center border-t p-4 pb-12 sm:justify-end sm:pb-4">
        <Button
          disabled={
            !isValid ||
            !!linkErrors?.['cv_link']?.message ||
            !!linkErrors['cv_name']?.message
          }
          className="flex h-11 w-full items-center justify-center sm:w-52"
          type="submit"
          variant="fill"
          value="Submit"
        >
          Review application
        </Button>
      </div>
    </form>
  );
};
