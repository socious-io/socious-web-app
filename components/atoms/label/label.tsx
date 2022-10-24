import {LabelProps} from './label.types';

export const Label = (props: LabelProps) => {
  return (
    <span className="block text-base font-semibold sm:text-sm">
      {props.children}
    </span>
  );
};
