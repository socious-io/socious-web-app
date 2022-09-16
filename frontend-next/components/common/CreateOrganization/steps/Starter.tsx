import React from 'react';
import Image from 'next/image';
import {ChevronLeftIcon} from '@heroicons/react/outline';
import StarterCard from '../components/StarterCard';

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

const Starter = () => {
  return (
    <>
      <div className="w-full h-56 relative ">
        <Image
          src={require('../../../../asset/images/TopHeader.png')}
          layout="fill"
          className="sm:rounded-t-3xl"
        />
        <ChevronLeftIcon className="h-6 w-6 text-white stroke-1.5 absolute left-2 top-12 hover:text-primary" />
      </div>

      <div className="h-full overflow-y-scroll">
        <p className="text-base font-medium text-left pl-10 pb-4 pt-5 text-black">
          Find talented professionals to help your social cause:
        </p>
        <div className="bg-offWhite flex flex-col divide-y divide-grayLineBased  items-center justify-center mx-6 rounded-3xl">
          {data.map((item) => {
            return (
              <StarterCard key={item.id} text={item.text} icon={item.icon} />
            );
          })}
        </div>
        <p className="px-10 text-xs text-graySubtitle leading-6 py-3">
          * You can post projects when your company has been successfully
          verified by our team.
        </p>
      </div>
    </>
  );
};

export default Starter;
