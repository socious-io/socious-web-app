/*
 * mainContent (left contetnt) of user profile page
 */

import React from 'react';

// components
import Header from './Header';
import MutaulConnections from './MutaulConnections';
import ProfileInfo from './ProfileInfo';
import Skills from './Skills';
import SocialCauses from './SocialCauses';
import About from './About';
import Contact from './Contact';

const MainContent = () => {
  return (
    <div className="w-4/6 border-grayLineBased  border border-1 rounded-xl ">
      <Header />
      <ProfileInfo />
      <MutaulConnections />
      <SocialCauses />
      <Contact />
      <About />
      <Skills />
    </div>
  );
};

export default MainContent;
