/*
 * organization section
 * (The list of organizations that the user has followed)
 */

import React from 'react';

// components
import OrganizationsCard from './OrganizationsCard';
import Title from './Title';

const Organizations = () => {
  return (
    <div className="px-4  border-y border-grayLineBased mb-20 ">
      <Title>Organizations</Title>
      <OrganizationsCard />
      <OrganizationsCard />
      <OrganizationsCard />
      <OrganizationsCard />
    </div>
  );
};

export default Organizations;
