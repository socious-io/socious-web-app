import React from 'react';
import Image from 'next/image';

//icons
import {ChevronLeftIcon} from '@heroicons/react/24/outline';

//components
import StarterCard from '../components/StarterCard';
import {Button} from '@components/common/Button/Button';

//interface
import {StepProps} from '@models/stepProps';

//this is information data for display in 'StarterCard'
const data = [
  {
    id: 1,
    text: 'A Share your organization’s mission and activity with a global network of over 1000+ social groups and individuals.',
    icon: require('../../../../asset/icons/network.svg'),
  },
  {
    id: 2,
    text: 'Get matched with like-minded people recommended daily by our AI engine.',
    icon: require('../../../../asset/icons/share.svg'),
  },
  {
    id: 3,
    text: 'Post projects and hire skilled people to help your organization make a social change.*',
    icon: require('../../../../asset/icons/projects.svg'),
  },
];

const Starter = ({onSubmit}: StepProps) => {
  return (
    <>
      <div className="relative h-56 w-full ">
        <Image
          src={require('../../../../asset/images/TopHeader.png')}
          layout="fill"
          className="sm:rounded-t-3xl"
        />
        <ChevronLeftIcon className="absolute left-2 top-12 h-6 w-6 stroke-1.5 text-white hover:text-primary" />
      </div>

      <div className="h-full overflow-y-scroll">
        <p className="px-10 pb-4 pt-5 text-left text-lg font-medium text-black sm:text-base">
          Find talented professionals to help your social cause:
        </p>
        <div className="mx-6 flex flex-col items-center justify-center  divide-y divide-grayLineBased rounded-3xl bg-offWhite">
          {data.map((item) => {
            return (
              <StarterCard key={item.id} text={item.text} icon={item.icon} />
            );
          })}
        </div>
        <p className="px-10 py-3 text-sm leading-6 text-graySubtitle sm:text-xs">
          * You can post projects when your company has been successfully
          verified by our team.
        </p>
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

export default Starter;
