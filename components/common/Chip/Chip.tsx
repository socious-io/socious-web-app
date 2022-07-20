import { twMerge } from "tailwind-merge";
import { CheckIcon } from "@heroicons/react/outline";

export interface ChipProps {
  size?: "s" | "m" | "l";
  content: string;
  selected?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}

const PADDING_LIST = {
  s: "py-py px-3",
  m: "py-1 px-3",
  l: "py-2.5 px-3",
};

export function Chip({
  size = "s",
  content = "",
  selected = false,
  containerClassName,
  contentClassName,
}: ChipProps) {
  return (
    <span
      className={twMerge(
        "flex-wrap border border-grayLineBased rounded-full",
        `${PADDING_LIST[size]}`,
        containerClassName && containerClassName
      )}
    >
      {selected && <CheckIcon className="w-5 h-5" />}
      <label className={contentClassName && contentClassName}>{content}</label>
    </span>
  );
}

export default Chip;
