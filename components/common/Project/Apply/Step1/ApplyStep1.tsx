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

interface ApplyStep extends StepProps {
  title: string;
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
export const ApplyStep1 = ({onSubmit, title}: ApplyStep) => {
  const {currentIdentity} = useUser();
  const {ProjectContext, setProjectContext} = useProjectContext();
  const {data} = useSWR<any>(`/orgs/${currentIdentity?.id}`, get);

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
      className="flex h-full w-full flex-col "
      onSubmit={handleSubmit(onSubmit)}
    >
      <FromLayout>
        <div className="overflow-y-scroll px-4 pt-4">
          <p className="font-bold text-black">{title}</p>
          <div className="mt-3 flex flex-row space-x-2">
            <Avatar size="s" type="organizations" />
            <p className="text-black">{currentIdentity?.meta?.name}</p>
          </div>
          <p className="mt-4 text-black">{data?.description}</p>
          <TitlePart title="Cover letter" />
          <p className="mt-6 text-black">
            Message<span className="ml-1 font-bold text-red-500 ">*</span>
          </p>
          <TextArea
            placeholder="Write a message..."
            rows={5}
            value={ProjectContext.cover_letter}
            containerClassName=""
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
      <div className=" flex items-end justify-end  border-t p-4 px-4">
        <Button
          disabled={!isValid}
          className="flex h-11 w-52 items-center justify-center"
          type="submit"
          variant="fill"
          value="Submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
