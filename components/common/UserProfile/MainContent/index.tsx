/*
 * mainContent (left contetnt) of user/organization profile page
 * The type of profile is determined by status
 */

import React from 'react';

// components
import Header from './Header';
import ProfileInfo from './ProfileInfo';
import Skills from './Skills';
import ArraySegmentBox from './ArraySegmentBox';
import Description from './Description';
import Contact from './Contact';

// hooks
import {useUser} from '@hooks';

// interfaces
interface Props {
  data: any;
  status: 'user' | 'organization';
}

const MainContent: React.FC<Props> = ({data, status}) => {
  const {user} = useUser();
  console.log(data);
  return (
    <div className="border-1 mb-8  rounded-xl border border-grayLineBased md:w-4/6  ">
      <Header
        avatar={status === 'user' ? data?.avatar : data?.image}
        cover_image={data?.cover_image}
        status={status}
      />
      <ProfileInfo
        first_name={data?.first_name}
        last_name={data?.last_name}
        bio={data?.bio}
        followings={data?.followings}
        followers={data?.followers}
      />

      {/* if user is current user show 'You' */}
      {user?.username === data?.username && (
        <p className="mt-3 px-4 text-sm text-secondary">You </p>
      )}

      <ArraySegmentBox social_causes={data?.social_causes} />
      {status === 'user' ? (
        <Contact
          address={data?.address}
          country={data?.country}
          city={data?.city}
          status={status}
        />
      ) : (
        <Contact
          address={data?.address}
          country={data?.country}
          city={data?.city}
          mobile_country_code={data?.mobile_country_code}
          email={data?.email}
          phone={data?.phone}
          website={data?.website}
          status={status}
        />
      )}
      <Description
        paragraph={data?.mission}
        title={status === 'user' ? 'About' : 'Mission'}
      />
      {status === 'user' && <Skills skills={data?.skills} />}
      <hr className="mb-20 border-grayLineBased" />
    </div>
  );
};

export default MainContent;
