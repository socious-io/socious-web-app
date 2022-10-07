import React, {useRef} from 'react';
import Modal from '@components/common/Modal/Modal';
import Image from 'next/image';
import {StepProps} from '@models/stepProps';
import {useForm} from 'react-hook-form';
import TextArea from '@components/common/TextArea/TextArea';
import Button from '@components/common/Button/Button';
import useUser from 'hooks/useUser/useUser';
import Avatar from '@components/common/Avatar/Avatar';
import BodyBox from '../../BodyBox/BodyBox';
import {LinkIcon} from '@heroicons/react/24/outline';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';
import {FromLayout} from '../../created/NewProject/Layout';
import {useProjectContext} from '../../created/NewProject/context';
import useSWR from 'swr';
import {get} from 'utils/request';
import {TitlePart} from '../Step1/ApplyStep1';
interface ApplyStep extends StepProps {
  title: string;
}
const ApplicationReview = ({onSubmit, title}: ApplyStep) => {
  const {currentIdentity} = useUser();
  const {ProjectContext} = useProjectContext();
  const {data} = useSWR<any>(`/orgs/${currentIdentity?.id}`, get);
  const {handleSubmit} = useForm();

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
      </FromLayout>
      <div className=" flex items-end justify-end  border-t p-4 px-4">
        <Button
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

export default ApplicationReview;
