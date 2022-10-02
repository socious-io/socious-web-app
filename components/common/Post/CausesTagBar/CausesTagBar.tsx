import {UseControllerReturn} from 'react-hook-form';
import {useMemo} from 'react';
import {Avatar, Combobox} from '@components/common';
import Data, {getText} from '@socious/data';

const items = Object.keys(Data.SocialCauses);

interface CausesTagBarProps {
  src: string;
  controller: UseControllerReturn;
}

export const CausesTagBar = ({src, controller}: CausesTagBarProps) => {
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

  return (
    <div className="-ml-6 -mr-6 flex items-center space-x-3 border-y-[0.5px] border-[#C3C8D9] p-4">
      <Avatar src={src} size="m" />
      <Combobox
        selected={
          controller?.field?.value
            ? {
                id: controller?.field?.value,
                name: getText('en', `PASSION.${controller?.field?.value}`),
              }
            : undefined
        }
        controller={controller}
        items={localItems}
        required
        className="w-full"
        placeholder="social causes"
      />
    </div>
  );
};

export default CausesTagBar;
