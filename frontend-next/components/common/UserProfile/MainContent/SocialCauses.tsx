/*
 * Social Causes component of profile
 */

import React from 'react';

// components
import Chip from './Chip';

const SocialCauses = () => {
  return (
    <div className="p-4">
      <h2 className="py-4 text-black">Social causes</h2>
      <div className="flex w-4/6 flex-wrap gap-2 ">
        <Chip name="Abortion" />
        <Chip name="Animal Rights" />
        <Chip name="Anti-Semitism" />
        <Chip name="Armed Conflict" />
        <Chip name="Biodiversity" />
        <Chip name="Biodiversity" />
      </div>
    </div>
  );
};

export default SocialCauses;
