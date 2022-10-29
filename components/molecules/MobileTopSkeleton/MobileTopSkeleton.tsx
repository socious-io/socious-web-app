import Router from 'next/router';
import {memo} from 'react';
import {twMerge} from 'tailwind-merge';

export type TOption = {value: string; url: string; id: string};
type MobileTopSkeletonProps = {
  list: TOption[];
  selectedTab: string;
};

const MobileTopSkeleton = ({list, selectedTab}: MobileTopSkeletonProps) => {
  return (
    <ul className="flex justify-around text-Gray03 md:hidden">
      {list.map((item) => {
        const selected = selectedTab === item.id;
        return (
          <li
            key={item.id}
            onClick={() => !selected && Router.push(item.url)}
            className={twMerge(
              'cursor-pointer p-4',
              selected &&
                'border-b-2 border-primary  font-semibold text-primary',
            )}
          >
            {item.value}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(MobileTopSkeleton);
