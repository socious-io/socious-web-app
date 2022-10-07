import React, {useRef} from 'react';
import Modal from '@components/common/Modal/Modal';
import Image from 'next/image';
import {StepProps} from '@models/stepProps';
import {useFormContext} from 'react-hook-form';
import TextArea from '@components/common/TextArea/TextArea';
import Button from '@components/common/Button/Button';
import useUser from 'hooks/useUser/useUser';
import Avatar from '@components/common/Avatar/Avatar';
import BodyBox from '../../BodyBox/BodyBox';
import {LinkIcon} from '@heroicons/react/24/outline';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';

interface Props extends StepProps {
  onAttach: () => void;
}

const menuExtraSrc = require('../../../../../asset/icons/logo.svg');

const ApplyStep1 = ({onSubmit, onAttach}: Props) => {
  const {user} = useUser();
  const formMethods = useFormContext();
  const {handleSubmit, formState, register, getValues} = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between">
        <ChevronLeftIcon className="h-6 w-6 cursor-pointer" />
        <Modal.Title>
          <h2 className="font-worksans text-center">Apply</h2>
        </Modal.Title>

        <Image src={menuExtraSrc} alt="menu bar" width="16px" height="16px" />
      </div>
      <Modal.Description>
        <div className="mt-2 space-y-4 pl-0 ">
          <p className="font-bold text-black">project title</p>
          <div className="flex flex-row space-x-2">
            <Avatar size="s" type="organizations" />

            <p className="text-black">Organization</p>
          </div>
          <p className="text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
            faucibus sed facilisi sit id blandiacilisi sit id blandit... See
            more
          </p>
          <div className="divid-y">
            <div>
              <hr />
            </div>
            <BodyBox title={'Cover Letter'} description={''} />
            <div>
              <hr />
            </div>
          </div>
          <p className="text-black">
            Message<span className="ml-1 font-bold text-red-500 ">*</span>
          </p>
          <TextArea
            placeholder="Write a message..."
            rows={2}
            containerClassName=""
            className="border-gray border-1  overflow-y-scroll focus:border-none"
            errorMessage={formState?.errors?.['content']?.message}
            register={register('content')}
          />

          <Button
            className=" mt-4 flex  max-w-xs  align-middle "
            type="button"
            size="lg"
            variant="outline"
            value="Submit"
            onClick={onAttach}
          >
            <LinkIcon className="h-5 w-5 cursor-pointer" />
            Attach link
          </Button>
          <BodyBox title={'Screening Questions'} description={''} />
        </div>
      </Modal.Description>
      <Button
        className="ml-auto mt-4 flex max-w-xs items-center justify-center align-middle "
        type="submit"
        variant="fill"
        value="Submit"
      >
        Review Application
      </Button>
    </form>
  );
};

export default ApplyStep1;
