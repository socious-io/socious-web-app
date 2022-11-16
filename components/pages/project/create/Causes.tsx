import React, {FC} from 'react';
import {useFormContext} from 'react-hook-form';

import Chip from '@components/common/Chip/Chip';
import SearchBar from '@components/common/SearchBar/SearchBar';
import useFilter from 'hooks/auth/useFilter';
import Title from '@components/molecules/Title';
import useGetData from 'hooks/useGetData';
import {Button} from '@components/common';
import {FormLayout} from '@components/common/Project/created/NewProject/Layout';
import useHandleSelected from 'hooks/useHandleSelected';

const Causes: FC<{onSubmit: () => void}> = ({onSubmit}) => {
  const maxCauses = 5;
  const {
    formState: {isValid},
    handleSubmit,
  } = useFormContext();
  const [selected, onSelect] = useHandleSelected('causes_tags', maxCauses);
  const {
    items: {passionDataItems},
  } = useGetData();
  const [filteredItems, filterWith] = useFilter(passionDataItems);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col"
    >
      <FormLayout>
        <Title description="Select up to 5 social causes" border={false}>
          What is your project about?
        </Title>
        <SearchBar
          type="text"
          placeholder="Search"
          onChange={(e) => filterWith(e?.currentTarget?.value || '')}
          className="my-6 mx-6"
        />
        <div className="h-14 w-full grow overflow-y-scroll bg-offWhite">
          <p className="px-6 pt-4 text-sm font-semibold text-black">Popular</p>
          <div className="flex w-5/6 flex-wrap gap-2 px-4 py-4">
            {filteredItems.map((item) => {
              return (
                <Chip
                  onSelected={onSelect}
                  selected={selected?.includes(item.id)}
                  value={item.id}
                  key={item.id}
                  content={item.name}
                  contentClassName="text-secondary cursor-pointer "
                  containerClassName="bg-background my-2 h-6"
                />
              );
            })}
          </div>
        </div>
      </FormLayout>
      <div className=" flex items-end justify-end  border-t p-4">
        <Button
          disabled={!isValid}
          type="button"
          onClick={() => onSubmit()}
          className="flex h-11 w-52 items-center justify-center"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default Causes;
