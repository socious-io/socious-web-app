import React from 'react';

//icons
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';

//props
interface Props {
  onChange: (event: {target: {value: React.SetStateAction<string>}}) => void;
  value: string;
}

const Search: React.FC<Props> = ({value, onChange}) => {
  return (
    <div className="relative my-4 flex w-full ">
      <input
        placeholder="search"
        value={value}
        onChange={onChange}
        className="mx-4 w-max flex-1 rounded-full border border-grayLineBased bg-offWhite py-2 pl-9 pr-6 outline-primary"
      />
      <MagnifyingGlassIcon className=" absolute left-6 top-3 h-5 w-5 stroke-1.5 text-graySubtitle " />
    </div>
  );
};

export default Search;
