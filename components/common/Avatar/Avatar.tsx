/* eslint-disable @next/next/no-img-element */
// @TODO: render wrong when use SVG, will fix it later
//import Image from "next/image";
// import AvatarDefault from "../../../asset/images/user.png";
// import OraganizationDefault from "../../../asset/images/company-avatar-filled.png";
import {twMerge} from 'tailwind-merge';
import enums from '@socious/data';

import {IdentityType} from '@models/identity';
export interface AvatarProps {
  src?: string;
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl';
  status?: 'offline' | 'online' | 'busy';
  type?: IdentityType;
  rounded?: boolean;
  className?: any;
}

const SIZE_LIST = {
  s: {
    imageSize: 'w-6 h-6',
    statusSize: 'h-1.5 w-1.5',
  },
  m: {
    imageSize: 'w-8 h-8',
    statusSize: 'w-2 h-2',
  },
  l: {
    imageSize: 'w-10 h-10',
    statusSize: 'h-2.5 w-2.5',
  },
  xl: {
    imageSize: 'w-12 h-12',
    statusSize: 'h-3 w-3',
  },
  xxl: {
    imageSize: 'w-24 h-24',
    statusSize: 'h-3 w-3',
  },
};

const STATUS_COLOR = {
  offline: 'bg-gray-300',
  online: 'bg-green-400',
  busy: 'bg-red-400',
};

export function Avatar({
  size = 's',
  status,
  src,
  type = 'users',
  rounded = true,
  className,
}: AvatarProps) {
  const {imageSize, statusSize} = SIZE_LIST[size];
  const statusColor = status && STATUS_COLOR[status];

  const imgSrc = require(type === 'organizations'
    ? '../../../asset/images/company-avatar-filled.png'
    : '../../../asset/images/user.png');

  return (
    <span
      className={twMerge(
        'relative inline-block border border-grayLineBased bg-white',
        rounded && 'rounded-full',
        imageSize,
        className,
      )}
    >
      <img
        className={twMerge('h-full w-full', rounded && 'rounded-full')}
        src={src || imgSrc}
        alt="avatar"
      />

      {status && (
        <span
          className={`absolute top-0 right-0 block rounded-full ring-2 ring-white ${statusSize} ${statusColor}`}
        />
      )}
    </span>
  );
}

export default Avatar;
