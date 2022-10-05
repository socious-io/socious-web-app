import React from 'react';
import Image from 'next/image';

import User from '@icons/userGroup.svg';

interface Props {
  title: string;
  applicants: number;
  hired: number;
  dateRange: string;
  border?: boolean;
  first?: boolean;
  last?: boolean;
}

const ProjectItem: React.FC<Props> = ({
  title,
  applicants,
  hired,
  dateRange,
  border = false,
  first = false,
  last = false,
}) => {
  const containerStyle = [
    'p-4',
    border ? 'm-2 rounded-xl border border-grayLineBased bg-white' : '',
    first ? 'mt-0' : '',
    last ? 'mb-0' : '',
  ].join(' ');

  return (
    <div className={containerStyle}>
      <h2 className="font-worksans text-base font-semibold text-primary">
        {title}
      </h2>
      <div className="flex items-center ">
        <div className="mr-2 w-12">
          <Image
            src={User}
            alt="user group"
            layout="responsive"
            width="100%"
            height="100%"
          />
        </div>
        <p className="text-sm">{`${applicants} applicants, ${hired} hired`}</p>
      </div>
      <label className="text-sm text-graySubtitle">{dateRange}</label>
    </div>
  );
};

export default ProjectItem;
