import Chip from '@components/common/Chip/Chip';
import React, {useState} from 'react';
import Search from '../components/Search';
import Title from '../components/Title';
import Data, {getText} from '@socious/data';
import {StepProps} from '@models/stepProps';
import { Button } from '@components/common/Button/Button';
const items = Object.keys(Data.SocialCauses);

const SocialCauses = ({onSubmit}: StepProps) => {
  const [selecteds, setSelecteds] = useState<any[]>([]);

  const handleOnSubmit = (e: any) => {
    console.log('submit');
    console.log(selecteds);
    e.preventDefault();
    onSubmit('true');
  };

  const handleSelecteds = (itemSelected: any) => {
    console.log(selecteds);
    selecteds?.includes(itemSelected)
      ? setSelecteds(selecteds?.filter((i) => i === itemSelected))
      : setSelecteds([...selecteds, itemSelected]);
  };
  return (
    <>
      <Title description="Select up to 5 social causes." border={false}>
        What are your social causes?
      </Title>
      <Search />
      <form
        onSubmit={handleOnSubmit}
        className="h-full overflow-y-scroll border-t border-grayLineBased bg-offWhite "
      >
        <p
          onClick={handleSelecteds}
          className="px-6 pt-4 text-sm font-semibold text-black"
        >
          Popular
        </p>
        <div className="flex w-5/6 flex-wrap gap-2 px-4 py-4 ">
          {items.map((item) => {
            return (
              <Chip
                onSelected={handleSelecteds}
                selected={selecteds?.includes(item)}
                value={item}
                key={item}
                content={item}
                containerClassName={
                  selecteds?.includes(item)
                    ? 'bg-secondary lowercase'
                    : 'bg-white lowercase'
                }
                contentClassName={
                  selecteds?.includes(item) ? 'text-white' : 'text-secondary'
                }
              />
            );
          })}
        </div>
      </form>
      <footer className="flex pt-6 pb-28 sm:pb-10 sm:pt-4 justify-center border-grayLineBased border-t">
          <Button
            type="submit"
            className="w-8/12 flex justify-center py-1.5 font-medium"
          >
            continue
          </Button>
        </footer>
    </>
  );
};

export default SocialCauses;
