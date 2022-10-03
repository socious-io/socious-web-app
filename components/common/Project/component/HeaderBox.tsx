import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/solid';
import {twMerge} from 'tailwind-merge';

type Props = {
  title: string;
  isExpand: boolean;
  isExpandable: boolean;
  isRound: boolean;
  expandToggle: () => void;
  isLastItem: boolean;
};

function HeaderBox({
  title,
  isExpandable,
  isRound,
  expandToggle,
  isExpand,
  isLastItem,
}: Props) {
  return (
    <div
      className={twMerge(
        'space-y-6 rounded-tl-2xl rounded-tr-2xl bg-white p-4 shadow-sm',
        !isRound && 'rounded-none rounded-tr-none',
        isLastItem &&
          !isExpand &&
          'rounded-bl-2xl rounded-br-2xl rounded-tl-none rounded-tr-none',
      )}
    >
      <div className="flex flex-row items-center justify-between space-x-2">
        <p className="font-worksans font-semibold">{title}</p>
        {isExpandable && (
          <span onClick={expandToggle}>
            {isExpand ? (
              <ChevronUpIcon
                className="h-5 w-5 fill-[#020305] text-gray-400"
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="h-5 w-5 fill-[#020305] text-gray-400"
                aria-hidden="true"
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default HeaderBox;
