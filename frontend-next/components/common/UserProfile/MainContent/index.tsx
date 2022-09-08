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
import Recommendations from './Recommendations';
import Organizations from './Organizations';

const MainContent = () => {
  return (
    <div className="w-4/6 border-grayLineBased  border border-1 rounded-xl mb-8 ">
      <Header />
      <ProfileInfo />
      <MutaulConnections />
      <SocialCauses />
      <Contact />
      <About />
      <Skills />
      <Recommendations />
      <Organizations />
    </div>
  );
};

export default MainContent;
