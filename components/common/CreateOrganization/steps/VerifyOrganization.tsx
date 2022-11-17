import React from 'react';
import Image from 'next/image';

//components
import {Button} from '@components/common/Button/Button';
import Title from '../../../molecules/Title';
import VerifyCard from '../components/VerifyCard';

//interfaces
import {StepProps} from '@models/stepProps';

//this is information data for display in 'VerifyCard'
const data = [
  {
    id: 1,
    title: 'Get verified',
    text: 'Send a company registration document such as a company certificate/equivalent along with your organization name to verify@socious.io.',
    icon: require('../../../../asset/icons/email.svg'),
  },
  {
    id: 2,
    title: 'Wait for processing',
    text: 'Our verification team will take 1-3 days to process your verification request. ',
    icon: require('../../../../asset/icons/time.svg'),
  },
  {
    id: 3,
    title: 'Verified!',
    text: 'An email and notification will be sent to you upon successful verification and you will then be able to start posting projects. ',
    icon: require('../../../../asset/icons/Verified.svg'),
  },
];

const VerifyOrganization = ({onSubmit}: StepProps) => {
  return (
    <>
      <div className="flex w-full flex-col px-8 pt-10">
        <Image
          src={require('../../../../asset/icons/Verified.svg')}
          alt="socious logo"
          width={40}
          height={40}
        />
        <Title
          description="Get your organization page verified to create projects and hire users on Socious"
          border={false}
          textAlign="text-center"
        >
          Get Verified
        </Title>
      </div>

      <div className="h-full overflow-y-scroll">
        <div className=" flex flex-col items-center justify-center border-t border-grayLineBased bg-offWhite">
          <p className="w-full px-4 py-4 text-left font-semibold text-primary">
            How to get verified?
          </p>
          {data.map((item) => {
            return <VerifyCard key={item.id} item={item} />;
          })}
        </div>
      </div>
      <footer className="flex justify-center border-t border-grayLineBased pt-6 pb-28 sm:pb-10 sm:pt-4">
        <Button
          onClick={onSubmit}
          className="flex w-8/12 justify-center py-1.5 font-medium"
        >
          continue
        </Button>
      </footer>
    </>
  );
};

export default VerifyOrganization;
