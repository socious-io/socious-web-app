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

const MainContent: React.FC<any> = ({data}) => {
  console.log(data);
  return (
    <div className="md:w-4/6 border-grayLineBased  border border-1 rounded-xl mb-8  ">
      <Header avatar={data?.avatar} cover_image={data?.cover_image} />
      <ProfileInfo
        first_name={data?.first_name}
        last_name={data?.last_name}
        bio={data?.bio}
        followings={data?.followings}
        followers={data?.followers}
      />
      <MutaulConnections />
      <SocialCauses social_causes={data?.social_causes} />
      <Contact
        address={data?.address}
        country={data?.country}
        city={data?.city}
      />
      <About mission={data?.mission} />
      <Skills skills={data?.skills} />
    </div>
  );
};

export default MainContent;
