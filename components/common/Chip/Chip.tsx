import {twMerge} from 'tailwind-merge';
import {CheckIcon} from '@heroicons/react/24/outline';

export interface ChipProps {
  size?: 's' | 'm' | 'l';
  content: string;
  value?: string;
  selected?: boolean;
  containerClassName?: string;
  contentClassName?: string;
  onSelected?: (value: string) => void;
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
        'flex flex-nowrap items-center space-x-2 rounded-full bg-secondarySLight text-secondary',
        `${PADDING_LIST[size]}`,
        containerClassName && containerClassName,
      )}
    >
      {selected && <CheckIcon className="h-5 w-5" />}
      <label className={contentClassName && contentClassName}>{content}</label>
    </span>
  );
}

export default Chip;
