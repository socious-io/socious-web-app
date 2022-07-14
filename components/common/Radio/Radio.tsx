import { UseFormRegisterReturn } from "react-hook-form";

/* eslint-disable-next-line */
export interface RadioInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name?: string;
  id?: string;
  checked: boolean;
  register?: UseFormRegisterReturn;
}

export function Radio({
  label,
  name,
  id,
  register,
  checked = false,
  ...props
}: RadioInputProps) {
  return (
    <label className="flex items-center">
      <div className="mr-2 -mt-1">
        <input
          {...props}
          type="radio"
          className="w-4 h-4 text-orange-500 rounded-full focus:ring-transparent"
          name={name}
          id={id}
          checked={checked}
          {...register}
        />
      </div>
      <div>{label}</div>
    </label>
  );
}

export default Radio;
