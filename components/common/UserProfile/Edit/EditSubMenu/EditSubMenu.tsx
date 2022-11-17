//Packages
import React, {useMemo} from 'react';

// Socious Data
import Data, {getText} from '@socious/data';
const passionData = Object.keys(Data.SocialCauses);

// Components
import SearchBar from '@components/common/SearchBar/SearchBar';

// Hooks
import useFilter from 'hooks/auth/useFilter';
import useHandleSelected from 'hooks/useHandleSelected';
import Chip from '@components/common/Chip/Chip';

interface EditSubMenuProps {
  items: any[];
  formField: string;
  maxSize: number;
  customText: string;
}

const EditSubMenu = ({
  items,
  formField,
  maxSize,
  customText,
}: EditSubMenuProps) => {
  const [selecteds, onSelect] = useHandleSelected(formField, maxSize);

  const [filteredItems, filterWith] = useFilter(items);
  return (
    <div className="flex grow flex-col overflow-y-auto">
      <div className="px-4">
        <SearchBar
          type="text"
          placeholder="Search"
          onChange={(e) => filterWith(e.currentTarget?.value || '')}
          className="my-3"
        />
      </div>
      <div className="flex grow flex-col overflow-hidden border-t-2 border-b-grayLineBased bg-offWhite px-4 pb-4">
        <h3 className="py-3">{customText}</h3>
        <div className="hide-scrollbar flex h-full flex-wrap gap-2 overflow-y-auto">
          {filteredItems.map((passion) => (
            <Chip
              onSelected={onSelect}
              selected={selecteds?.includes(passion.id)}
              value={passion.id}
              key={passion.id}
              content={passion.name}
              contentClassName="text-secondary cursor-pointer"
              containerClassName="bg-background my-2 h-6"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditSubMenu;
