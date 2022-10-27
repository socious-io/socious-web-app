import React, {FC, useEffect, useState} from 'react';
import {StepProps} from '@models/stepProps';
import {useForm} from 'react-hook-form';
import {TextInput, TextArea, Button, Avatar} from '@components/common';
import {FromLayout} from '../../created/NewProject/Layout';
import {schemaApplyProject} from '@api/projects/validation';
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

  const {state: showLinkFields, handlers: linkFieldsHandlers} = useToggle();

  const {
    handleSubmit,
    formState: {isValid, errors, isSubmitting},
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
      <FromLayout type="FULL" className="!grow">
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
            <TitlePart
              title="Link"
              className="-mx-4 -mb-2 border-b-0 px-4 text-xl"
            />
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
              disabled={!isValid || isSubmitting}
              className="flex h-11 w-full items-center justify-center"
              type="submit"
              variant="fill"
              value="Submit"
            >
              Submit application
            </Button>
          </div>
        </div>
      </FromLayout>
    </form>
  );
};
