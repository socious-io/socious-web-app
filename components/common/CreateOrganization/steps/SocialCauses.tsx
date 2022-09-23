import React, {useState, useMemo} from 'react';

//components
import Chip from '@components/common/Chip/Chip';
import SearchBar from '@components/common/SearchBar/SearchBar';
import Title from '../components/Title';
import {Button} from '@components/common/Button/Button';

//interfaces
import {StepProps} from '@models/stepProps';

//libraries
import {useFormContext} from 'react-hook-form';

//hooks
import useHandleSelected from 'hooks/auth/useHandleSelected';
import useFilter from 'hooks/auth/useFilter';

//get social causes constant data
import Data, {getText} from '@socious/data';
const passionData = Object.keys(Data.SocialCauses);

const SocialCauses = ({onSubmit}: StepProps) => {
  const formMethods = useFormContext();
  const {watch} = formMethods;
  const passion = watch('social_causes');

  //list of social causes
  const passions = useMemo(
    () => {
      const sorted = passionData.map((id) => ({
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

  const maxCauses = 5;
  //first item is data name in form-hook , second item is max array lenght
  const [selecteds, onSelect] = useHandleSelected('social_causes', maxCauses);

  //search hook
  const [filteredItems, filterWith] = useFilter(passions);

  return (
    <>
      <Title description="Select up to 5 social causes." border={false}>
        What are your social causes?
      </Title>
      <SearchBar
        type="text"
        placeholder="Search"
        onChange={(e) => filterWith(e?.currentTarget?.value || '')}
        className="my-6"
      />
      <form
        onSubmit={onSubmit}
        className="flex h-full flex-col border-t border-grayLineBased"
      >
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
                    selecteds?.includes(item.id)
                      ? 'text-white'
                      : 'text-secondary'
                  }
                />
              );
            })}
          </div>
        </div>
        <footer className="w-full flex-none justify-center border-t border-grayLineBased pt-6 pb-28 sm:pb-10 sm:pt-4">
          <Button
            type="submit"
            disabled={!(passion?.length === maxCauses)}
            className="mx-auto flex w-8/12 justify-center py-1.5 font-medium"
          >
            continue
          </Button>
        </footer>
      </form>
      0
    </>
  );
};

export default SocialCauses;
