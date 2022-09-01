import {twMerge} from 'tailwind-merge';
import {CheckIcon} from '@heroicons/react/outline';

export interface ChipProps {
  size?: 's' | 'm' | 'l';
  content: string;
  value?: string | number;
  selected?: boolean;
  containerClassName?: string;
  contentClassName?: string;
  onSelected?: (value: string) => void;
}

const PADDING_LIST = {
  s: 'py-py px-3',
  m: 'py-1 px-3',
  l: 'py-2.5 px-3',
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
        'flex flex-wrap  rounded-full',
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
