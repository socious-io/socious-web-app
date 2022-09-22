import React, {useState, useMemo} from 'react';

//components
import Chip from '@components/common/Chip/Chip';
import Search from '../components/Search';
import Title from '../components/Title';
import {Button} from '@components/common/Button/Button';

//interfaces
import {StepProps} from '@models/stepProps';

//get social causes constant data
import Data, {getText} from '@socious/data';
const items = Object.keys(Data.SocialCauses);

const SocialCauses = ({onSubmit}: StepProps) => {
  const [selecteds, setSelecteds] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');

  //the English human version data of social causes
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

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit('true');
  };

  //select social causes function
  const handleSelecteds = (itemSelected: any) => {
    console.log(selecteds);
    selecteds?.includes(itemSelected)
      ? setSelecteds(selecteds?.filter((i) => i === itemSelected))
      : setSelecteds([...selecteds, itemSelected]);
  };

  //onchange search input
  const searchHandler = (event: {
    target: {value: React.SetStateAction<string>};
  }) => {
    setSearch(event.target.value);
  };

  //search filter items
  const searchedItem = localItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Title description="Select up to 5 social causes." border={false}>
        What are your social causes?
      </Title>
      <Search value={search} onChange={searchHandler} />
      <form
        onSubmit={handleOnSubmit}
        className="flex h-full flex-col border-t border-grayLineBased"
      >
        <div className="h-14 grow overflow-y-scroll bg-offWhite">
          <p
            onClick={handleSelecteds}
            className="px-6 pt-4 text-sm font-semibold text-black"
          >
            Popular
          </p>
          <div className="flex w-5/6 flex-wrap gap-2 px-4 py-4">
            {searchedItem.map((item) => {
              return (
                <Chip
                  onSelected={handleSelecteds}
                  selected={selecteds?.includes(item)}
                  value={item.name}
                  key={item.id}
                  content={item.name}
                  containerClassName={
                    selecteds?.includes(item) ? 'bg-secondary' : 'bg-white'
                  }
                  contentClassName={
                    selecteds?.includes(item) ? 'text-white' : 'text-secondary'
                  }
                />
              );
            })}
          </div>
        </div>
        <footer className="w-full flex-none justify-center border-t border-grayLineBased pt-6 pb-28 sm:pb-10 sm:pt-4">
          <Button
            type="submit"
            className="mx-auto flex w-8/12 justify-center py-1.5 font-medium"
          >
            continue
          </Button>
        </footer>
      </form>
    </>
  );
};

export default SocialCauses;
