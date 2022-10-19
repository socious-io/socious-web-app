import {twMerge} from 'tailwind-merge';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';

export interface ChipProps {
  size?: 's' | 'm' | 'l';
  content: string;
  value?: string | number;
  selected?: boolean;
  containerClassName?: string;
  contentClassName?: string;
  withCheckIcon?: boolean;
  onRemove?: (value: string) => void;
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
  withCheckIcon = true,
  onRemove,
  onSelected,
}: ChipProps) {
  return (
    <span
      onClick={() => {
        onSelected && value && onSelected(value as string);
      }}
      className={twMerge(
        'inline-flex cursor-pointer flex-nowrap items-center space-x-2 rounded-full bg-secondarySLight text-secondary',
        `${PADDING_LIST[size]}`,
        containerClassName && containerClassName,
      )}
    >
      {selected && withCheckIcon && <CheckIcon className="h-5 w-5" />}
      <label className={contentClassName && contentClassName}>{content}</label>
      {onRemove ? (
        <XMarkIcon className="w-5" onClick={() => onRemove(value as string)} />
      ) : null}
    </span>
  );
}

export default Chip;
