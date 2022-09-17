import {twMerge} from 'tailwind-merge';
import {CheckIcon} from '@heroicons/react/24/outline';

export interface ChipProps {
  size?: 's' | 'm' | 'l';
  content: string;
  value?: string | number;
  selected?: boolean;
  containerClassName?: string;
  contentClassName?: string;
  onSelected?: (value: string | number) => void;
}

const PADDING_LIST = {
  s: 'py-1 px-3',
  m: 'py-1 px-3',
  l: 'py-1 px-3',
};

export function Chip({
  size = 's',
  content = '',
  value,
  selected = false,
  containerClassName,
  contentClassName,
  onSelected,
}: ChipProps) {
  return (
    <span
      onClick={() => {
        onSelected && value && onSelected(value);
      }}
      className={twMerge(
        'flex items-center space-x-2 flex-nowrap bg-secondarySLight rounded-full text-secondary',
        `${PADDING_LIST[size]}`,
        containerClassName && containerClassName,
      )}
    >
      {selected && <CheckIcon className="w-5 h-5" />}
      <label className={contentClassName && contentClassName}>{content}</label>
    </span>
  );
}

export default Chip;
