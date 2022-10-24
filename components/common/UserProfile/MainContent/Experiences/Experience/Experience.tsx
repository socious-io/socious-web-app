import Image from 'next/image';
import organizationIcon from '@icons/Base.svg';
import {ExperienceProps} from './Experience.types';
import editBlack from '/asset/icons/edit-black.svg';

export const Experience = ({value, onEdit}: ExperienceProps): JSX.Element => {
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
        <div className="flex text-lg text-black">
          <span onClick={() => onEdit(value)} className="pr-2">
            {value.title}
          </span>
          <Image src={editBlack} alt="edit" width={22} height={22} />
        </div>
        <span>{value.description}</span>
        <span>{value.start_at}</span>
        <span>{value.end_at}</span>
      </div>
    </div>
  );
};
