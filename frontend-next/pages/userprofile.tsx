/*
 * user profile page
 */

import React from 'react';
import type {NextPage} from 'next';

//components
import MainContent from '@components/common/UserProfile/MainContent';

const UserProfile: NextPage = () => {
  return (
    <div className="w-full">
      <MainContent />
    </div>
  );
};

export default UserProfile;
