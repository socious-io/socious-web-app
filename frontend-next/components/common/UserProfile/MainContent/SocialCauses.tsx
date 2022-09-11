/*
 * Social Causes component of profile
 */

import React from 'react';

// components
import Chip from './Chip';
import Title from './Title';

const SocialCauses = () => {
  return (
    <div className="p-4">
      <Title>Social causes</Title>
      <div className="flex w-4/6 flex-wrap gap-2 ">
        <Chip name="Abortion" />
        <Chip name="Animal Rights" />
        <Chip name="Anti-Semitism" />
        <Chip name="Armed Conflict" />
        <Chip name="Biodiversity" />
      </div>
    </div>
  );
};

export default SocialCauses;
