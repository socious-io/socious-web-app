import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/solid';

type Props = {
  title: string;
  isExpand: boolean;
  expandToggle: () => void;
};

function HeaderBox({title, expandToggle, isExpand}: Props) {
  return (
    <div className="space-y-6 rounded-tl-2xl rounded-tr-2xl border border-grayLineBased  bg-white p-4">
      <div className="flex flex-row items-center justify-between space-x-2">
        <p className="font-semibold">{title}</p>
        <span onClick={expandToggle}>
          {isExpand ? (
            <ChevronUpIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default HeaderBox;
