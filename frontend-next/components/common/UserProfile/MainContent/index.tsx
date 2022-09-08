/*
 * mainContent (left contetnt) of user profile page
 */

import React from 'react';

// components
import Header from './Header';
import MutaulConnections from './MutaulConnections';
import ProfileInfo from './ProfileInfo';
import SocialCauses from './SocialCauses';

const MainContent = () => {
  return (
    <div className="w-4/6 border-grayLineBased  border border-1 rounded-xl ">
      <Header />
      <ProfileInfo />
      <MutaulConnections />
      <SocialCauses />
    </div>
  );
};

export default MainContent;
