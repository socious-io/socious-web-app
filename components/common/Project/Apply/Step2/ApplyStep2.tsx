import React from 'react';
import {StepProps} from '@models/stepProps';
import {useForm} from 'react-hook-form';
import Button from '@components/common/Button/Button';
import Avatar from '@components/common/Avatar/Avatar';
import {FormLayout} from '../../created/NewProject/Layout';
import {useProjectContext} from '../../created/NewProject/context';
import useSWR from 'swr';
import {get} from 'utils/request';
import {TitlePart} from '../Step1/ApplyStep1';
import {Project} from 'models/project';

interface ApplyStep extends StepProps {
  project: Project;
}
const ApplicationReview = ({onSubmit, project}: ApplyStep) => {
  const {ProjectContext} = useProjectContext();
  const {data} = useSWR<any>(`/orgs/${project?.identity_id}`, get);
  const {handleSubmit} = useForm();

  return (
    <form
      className="flex h-full w-full flex-col "
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLayout type="FULL">
        <div className="overflow-y-scroll px-4 pt-4">
          <p className="font-bold text-black">{project?.title}</p>
          <div className="mt-3 flex flex-row space-x-2">
            <Avatar size="s" type="organizations" />
            <p className="text-black">{data?.name}</p>
          </div>
          <p className="mt-4 text-black">{project?.description}</p>
          <TitlePart title="Cover letter" />
          <p className="mt-6 text-black">{ProjectContext.cover_letter}</p>
          {ProjectContext.share_contact_info && (
            <>
              <TitlePart title="Contact info" />

              <div className="my-4 flex w-full flex-row  justify-between">
                <div>
                  Your contact information (email, phone & address) will be
                  shared with Organization.
                </div>
              </div>
            </>
          )}
        </div>
      </FormLayout>
      <div className=" flex items-end justify-center border-t p-4 pb-12 sm:justify-end sm:pb-4">
        <Button
          className="flex h-11 w-full items-center justify-center sm:w-52"
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

export default ApplicationReview;
