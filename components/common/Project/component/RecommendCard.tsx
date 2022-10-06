import {Avatar, Chip} from '@components/common';

import {Project} from 'models/project';
import Link from 'next/link';
import Image from 'next/image';
import {FC} from 'react';
const imgSrc = require('../../../../asset/icons/IconRight.svg');
const imgUserSrc = require('../../../../asset/icons/userWithBorder.svg');
const dislikeSrc = require('../../../../asset/icons/thumbs-dislike.svg');
const bookmarkSrc = require('../../../../asset/icons/bookmark.svg');

type RecommendCardType = {
  title: string;
  index: number;
};
const RecommendCard: FC<RecommendCardType> = ({title, index}) => {
  return (
    <div
      className={`inline-block h-40 w-5/6 cursor-pointer ${
        index === 0 ? 'pl-0' : 'pl-2 '
      } duration-300  ease-in-out md:w-[50%]`}
    >
      <div className="h-full w-full rounded-2xl border  border-grayLineBased bg-white p-4">
        <div className="flex flex-row items-center justify-between ">
          <div className="flex flex-row space-x-2">
            <Avatar size="xl" type={'organizations'} />
            <div className="flex flex-col">
              <p className="text-black">Organization</p>
              <p className="text-graySubtitle">Location</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center ">
              <div className="relative  h-5 w-5 ">
                <Link href="/">
                  <a>
                    <Image
                      src={dislikeSrc}
                      className="fill-warning"
                      alt="dislike"
                      layout="fill" // required
                    />
                  </a>
                </Link>
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
          </div>
        </div>
        <div className=" mt-4">
          <p className="text-base font-semibold">{title}</p>
        </div>

        <div className="mt-4 flex justify-between">
          <dt className="flex text-sm font-normal text-gray-600">Post date</dt>
          <div className="flex flex-row items-center ">
            <div className="relative  h-6 w-6 ">
              <Link href="/">
                <a>
                  <Image
                    src={imgUserSrc}
                    className="fill-warning"
                    alt="socious logo"
                    layout="fill" // required
                  />
                </a>
              </Link>
            </div>
            <div className="relative -ml-2  h-6 w-6 ">
              <Link href="/">
                <a>
                  <Image
                    src={imgUserSrc}
                    className="fill-warning"
                    alt="socious logo"
                    layout="fill" // required
                    width={24}
                    height={24}
                  />
                </a>
              </Link>
            </div>
            <div className="relative -ml-2  h-6 w-6 ">
              <Link href="/">
                <a>
                  <Image
                    src={imgUserSrc}
                    className="fill-warning"
                    alt="socious logo"
                    layout="fill" // required
                    width={32}
                    height={32}
                  />
                </a>
              </Link>
            </div>
            <dd className="ml-2 text-sm text-secondary">connections</dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendCard;
