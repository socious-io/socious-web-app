import React, {FC, useEffect, useMemo} from 'react';
import Chip from '@components/common/Chip/Chip';
import SearchBar from '@components/common/SearchBar/SearchBar';
import {useFormContext} from 'react-hook-form';
import useHandleSelected from 'hooks/auth/useHandleSelected';
import useFilter from 'hooks/auth/useFilter';
import Title from '@components/common/CreateOrganization/components/Title';
import Data, {getText} from '@socious/data';

const ProjectAbout = () => {
  const passionData = Object.keys(Data.SocialCauses);
  const formMethods = useFormContext();

  const {
    watch,
    getValues,
    getFieldState,
    formState: {isValid, isDirty, errors},
  } = formMethods;
  const passion = watch();
  console.log(passion);

  const passions = useMemo(() => {
    const sorted = passionData.map((id) => ({
      id,
      name: getText('en', `PASSION.${id}`),
    }));
    sorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    return sorted;
  }, [passionData]);

  const maxCauses = 5;
  const [selecteds, onSelect] = useHandleSelected('causes_tags', maxCauses);
  const [filteredItems, filterWith] = useFilter(passions);

  return (
    <div className="flex h-full w-full flex-col bg-zinc-200">
      <Title description="Select up to 5 passions." border={false}>
        What is your project about?
      </Title>
      <SearchBar
        type="text"
        placeholder="Search"
        onChange={(e) => filterWith(e?.currentTarget?.value || '')}
        className="my-6 mx-6"
      />
      <div className="h-14 grow overflow-y-scroll bg-offWhite">
        <p className="px-6 pt-4 text-sm font-semibold text-black">Popular</p>
        <div className="flex w-5/6 flex-wrap gap-2 px-4 py-4">
          {filteredItems.map((item) => {
            return (
              <Chip
                onSelected={onSelect}
                selected={selecteds?.includes(item.id)}
                value={item.id}
                key={item.id}
                content={item.name}
                containerClassName={
                  selecteds?.includes(item.id) ? 'bg-secondary' : 'bg-white'
                }
                contentClassName={
                  selecteds?.includes(item.id) ? 'text-white' : 'text-secondary'
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectAbout;
