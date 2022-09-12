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

const MainContent: React.FC<any> = ({data}) => {
  console.log(data);
  return (
    <div className="md:w-4/6 border-grayLineBased  border border-1 rounded-xl mb-8  ">
      <Header data={data} />
      <ProfileInfo data={data} />
      <MutaulConnections />
      <SocialCauses data={data} />
      <Contact data={data} />
      <About data={data} />
      <Skills data={data} />
      <Recommendations />
      <Organizations />
    </div>
  );
};

export default MainContent;
