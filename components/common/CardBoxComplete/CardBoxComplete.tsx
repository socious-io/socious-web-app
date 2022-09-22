import {Avatar, Chip} from '@components/common';
import {Project} from 'models/project';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';
import TextBoxGray from '../TextBoxGray/TextBoxGray';
import Image from 'next/image';

interface Props {
  bodyTitle: string;
  bodyTitleColor: string;
  description: string;
}
const bookmarkSrc = require('../../../asset/icons/bookmark.svg');

function CardBoxComplete({bodyTitle, bodyTitleColor, description}: Props) {
  return (
    <div className="border border-b-grayLineBased  bg-white p-4">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row items-center  space-x-2">
          <Avatar size="l" />
          <p className="text-black">Organization</p>
        </div>
        <div className="relative ml-8 h-6 w-6 ">
          <Link href="/">
            <a>
              <Image
                src={bookmarkSrc}
                className="fill-warning"
                alt="bookmark"
                layout="fill" // required
                width={24}
                height={24}
              />
            </a>
          </Link>
        </div>
      </div>
      <p className="my-4 text-sm">Mar 1 -Mar 10</p>
      {bodyTitle && (
        <p className={twMerge('my-4 text-sm', bodyTitleColor)}>{bodyTitle}</p>
      )}
      <TextBoxGray
        backColor={'text-offwhite'}
        textColor={'text-gray'}
        title={description}
      />
    </div>
  );
}

export default CardBoxComplete;
