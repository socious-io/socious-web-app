import Chip from '@components/common/Chip/Chip';
import React from 'react';
import Search from '../components/Search';
import Title from '../components/Title';
import {SOCIAL_CAUSES} from '../constants';

const SocialCauses = () => {
  return (
    <>
      <Title description="Select up to 5 social causes." border={false}>
        What are your social causes?
      </Title>
      <Search />
      <div className="h-full overflow-y-scroll bg-offWhite border-t border-grayLineBased ">
        <p className="text-sm font-semibold text-black px-6 pt-4">Popular</p>
        <div className="px-4 flex w-5/6 py-4 flex-wrap gap-2 ">
          {SOCIAL_CAUSES.map((item) => {
            return (
              <Chip
                key={item}
                content={item}
                containerClassName="bg-white lowercase"
                contentClassName="text-secondary"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SocialCauses;
