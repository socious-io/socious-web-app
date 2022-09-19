import {UseFormRegisterReturn} from 'react-hook-form';
import {useEffect, useMemo, useState} from 'react';
import {Avatar, Combobox} from '@components/common';
import Data, {getText} from '@socious/data';

const items = Object.keys(Data.SocialCauses);

type selectionType = {
  id: string;
  name: string;
};

interface CausesTagBarProps {
  src: string;
  register: UseFormRegisterReturn;
  errorMessage?: any;
  preSelected?: string;
}

export const CausesTagBar = ({
  src,
  register,
  errorMessage,
  preSelected,
}: CausesTagBarProps) => {
  const [selected, setSelected] = useState<selectionType>();
  const localItems = useMemo(
    () => {
      const sorted = items.map((id) => ({
        id,
        name: getText('en', `PASSION.${id}`),
      }));
      sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
      return sorted;
    },
    [
      // todo: language
    ],
  );
  useEffect(() => {
    if (preSelected)
      setSelected(localItems.find((item) => item.id === preSelected));
  }, [localItems, preSelected]);

  return (
    <div className="-ml-6 -mr-6 flex items-center space-x-3 border-y-[0.5px] border-[#C3C8D9] p-4">
      <Avatar src={src} size="m" />
      <Combobox
        register={register}
        selected={selected}
        onSelected={setSelected}
        items={localItems}
        errorMessage={errorMessage}
        required
        className="w-full"
        placeholder="social causes"
      />
    </div>
  );
};

export default CausesTagBar;
