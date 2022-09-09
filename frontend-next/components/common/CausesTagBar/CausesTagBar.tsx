import { UseFormRegisterReturn } from "react-hook-form";
import Avatar from "../Avatar/Avatar";
import Combobox from "../Combobox/Combobox";
import { useEffect, useState } from "react";

const items = [
  {id: 1, name: "MINORITY"},
  {id: 2, name: "DIVERSITY_INCLUSION"},
  {id: 3, name: "INDIGENOUS_PEOPLES"},
  {id: 4, name: "DISABILITY"},
]

interface CausesTagBarProps {
  url: string,
  register: UseFormRegisterReturn
  errorMessage?: any,
  preSelected?: string,
}

type selectionType = {
  id: number,
  name: string,
}

export const CausesTagBar = ({
  url,
  register,
  errorMessage,
  preSelected,
}: CausesTagBarProps) => {

  const [selected, setSelected] = useState<selectionType>();
  useEffect(() => {
    if (preSelected) setSelected(items.find(item => item.name === preSelected))
  }, [preSelected])

  return (
    <div className='flex items-center space-x-3 -ml-6 -mr-6 border-[#C3C8D9] border-y-[0.5px] p-4'>
      <Avatar src={url} size="m" />
      <Combobox 
        register={register}
        selected={selected}
        onSelected={setSelected}
        items={items}
        errorMessage={errorMessage}
        required
        className="w-full"
        placeholder="social causes"
      />
    </div>
  );
};

export default CausesTagBar;