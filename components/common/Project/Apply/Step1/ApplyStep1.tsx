import React, {FC, useEffect} from 'react';
import {StepProps} from '@models/stepProps';
import {useForm} from 'react-hook-form';
import TextArea from '@components/common/TextArea/TextArea';
import Button from '@components/common/Button/Button';
import useUser from 'hooks/useUser/useUser';
import Avatar from '@components/common/Avatar/Avatar';
import {FromLayout} from '../../created/NewProject/Layout';
import {schemaApplyProject} from '@api/projects/validation';
import {joiResolver} from '@hookform/resolvers/joi';
import {useProjectContext} from '../../created/NewProject/context';
import {LinkIcon} from '@heroicons/react/24/outline';
import {Switch} from '@components/common';
import useSWR from 'swr';
import {get} from 'utils/request';
import {Project} from 'models/project';

interface ApplyStep extends StepProps {
  project: Project;
}
export const TitlePart: FC<{
  title: string;
}> = ({title}) => {
  return (
    <div className="mt-4 border-y pt-6 pb-4 text-base font-semibold">
      {title}
    </div>
  );
};
export const ApplyStep1 = ({onSubmit, project}: ApplyStep) => {
  const {ProjectContext, setProjectContext} = useProjectContext();
  const {data} = useSWR<any>(`/orgs/${project?.identity_id}`, get);

  const {
    handleSubmit,
    formState: {isValid, errors},
    setValue,
  } = useForm({
    resolver: joiResolver(schemaApplyProject),
  });

  useEffect(() => {
    if (ProjectContext) {
      setValue('cover_letter', ProjectContext.cover_letter, {
        shouldValidate: true,
      });
    }
  }, []);

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
          <Button
            onClick={() =>
              setProjectContext({
                ...ProjectContext,
                formStep: 3,
              })
            }
            className="mt-9 flex h-9 w-36 items-center justify-center p-0"
            type="button"
            variant="outline"
            leftIcon={() => <LinkIcon width={20} height={20} />}
          >
            Attach Link
          </Button>
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
          disabled={!isValid}
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
