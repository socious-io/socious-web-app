import Image from 'next/image';
import {Experience as Props} from '@models/experience';
import organizationIcon from '@icons/Base.svg';

export const Experience = (props: Props): JSX.Element => {
  return (
    <div className="grid grid-cols-[48px_1fr] items-start gap-3">
      <Image
        className="mt-auto"
        width={48}
        height={48}
        src={organizationIcon}
        alt="company icon"
      />
      <div className="flex flex-col text-graySubtitle">
        <div className="text-lg text-black">{props.organization}</div>
        <span>{props.role}</span>
        <span>{props.date}</span>
        <span>{props.location}</span>
      </div>
    </div>
  );
};
