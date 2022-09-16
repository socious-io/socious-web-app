import {Avatar, Chip} from '@components/common';

import {Project} from 'models/project';
import Link from 'next/link';
import Image from 'next/image';

const imgSrc = require('../../../asset/icons/IconRight.svg');
const imgUserSrc = require('../../../asset/icons/userWithBorder.svg');
const dislikeSrc = require('../../../asset/icons/thumbs-dislike.svg');
const bookmarkSrc = require('../../../asset/icons/bookmark.svg');

function ProjectCard({title}: Project) {
  return (
    <div className="p-4  bg-white rounded-2xl border border-grayLineBased">
      <div className="flex flex-row items-center justify-between ">
        <div className="flex flex-row space-x-2">
          <Avatar size="l" />
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
      <div className="">
        <p className="font-semibold">{title}</p>
      </div>
      <div className="flex flex-row mt-4 space-x-2 divide-x divide-solid divide-graySubtitle">
        <p className="text-graySubtitle text-sm ">Part time</p>
        <p className="text-graySubtitle text-sm pl-2 ">Volunteer</p>
        <p className="text-graySubtitle text-sm pl-2 ">Expert</p>
      </div>
      <div>
        <p className="text-sm my-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Equat
          faucibus sed facilisi sit id blandiacilisi sit id blandit
        </p>
      </div>

      <div className="flex flex-row ">
        <div className="flex flex-row space-x-2 hide-scroll-bar  overflow-auto whitespace-no-wrap  w-7/10">
          <Chip
            content="Environment"
            contentClassName="text-secondary text-sm"
          />
          <Chip
            content="Peacebuilding"
            contentClassName="text-secondary text-sm"
          />
          <Chip
            content="MentalHealth"
            contentClassName="text-secondary text-xs"
          />
        </div>
        <span className="flex flex-row ml-2 items-center ">
          <Image src={imgSrc} alt="arrow" width={24} height={24} />
        </span>
      </div>
      <div className="flex mt-4 justify-between">
        <dt className="flex font-medium text-gray-900">Post date</dt>
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
          <dd className="ml-2 text-secondary text-sm">connections</dd>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
