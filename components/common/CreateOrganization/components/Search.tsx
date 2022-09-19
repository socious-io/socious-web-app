import React from 'react';
import {StopIcon} from '@heroicons/react/24/outline'

const Search = () => {
  return (
    <div className="w-full relative flex my-4 ">
      <input
        placeholder="search"
        className="mx-4 flex-1 border border-grayLineBased bg-offWhite w-max py-2 pl-9 pr-6 rounded-full"
      />
      <StopIcon className=" h-5 w-5 text-graySubtitle stroke-1.5 absolute left-6 top-3" />
    </div>
  );
};

export default Search;
