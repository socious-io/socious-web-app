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

const ApplyStep2 = ({onSubmit, onAttach}: Props) => {
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
          <p className="text-black">
            Link name <span className="ml-1 font-bold text-red-500 ">*</span>
          </p>
          <TextArea
            placeholder="Write a message..."
            rows={2}
            containerClassName=""
            className="border-gray border-1  overflow-y-scroll focus:border-none"
            errorMessage={formState?.errors?.['content']?.message}
            register={register('content')}
          />
        </div>
        <div className="mt-2 space-y-4 pl-0 ">
          <p className="text-black">
            Link URL<span className="ml-1 font-bold text-red-500 ">*</span>
          </p>
          <TextArea
            placeholder="Write a message..."
            rows={2}
            containerClassName=""
            className="border-gray border-1  overflow-y-scroll focus:border-none"
            errorMessage={formState?.errors?.['content']?.message}
            register={register('content')}
          />
        </div>
      </Modal.Description>
      <Button
        className="ml-auto mt-4 flex max-w-xs items-center justify-center align-middle "
        type="button"
        variant="fill"
        value="Submit"
        onClick={onAttach}
      >
        Add Link
      </Button>
    </form>
  );
};

export default ApplyStep2;
