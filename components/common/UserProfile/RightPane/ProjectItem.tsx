import UserCircles from '@components/molecules/indicators/UserCircles';
import React from 'react';

interface Props {
  title: string;
  applicants: number;
  hired: number;
  date: string;
  border?: boolean;
  first?: boolean;
  last?: boolean;
}

const ProjectItem: React.FC<Props> = ({
  title,
  applicants,
  hired,
  date,
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
        <UserCircles number={applicants + hired} />
        <p className="text-sm">
          {applicants === 0 ? 'No applicants' : `${applicants} applicants`}
        </p>
      </div>
      <label className="text-sm text-graySubtitle">{date}</label>
    </div>
  );
};

export default ProjectItem;
