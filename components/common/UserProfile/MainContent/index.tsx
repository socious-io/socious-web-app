/*
 * mainContent (left contetnt) of user/organization profile page
 * The type of profile is determined by status
 */

import React from 'react';

// components
import Header from './Header';
import ProfileInfo from './ProfileInfo';
import Skills from './Skills';
import ProjectItem from './ProjectItem';
import Description from './Description';
import Contact from './Contact';

// libraries
import useSWR, {KeyedMutator} from 'swr';

// utils
import {get} from 'utils/request';

// hooks
import {useUser} from '@hooks';

// interfaces
interface Props {
  data: any;
  status: 'user' | 'organization';
  profile_mutate: KeyedMutator<any>;
}

const MainContent: React.FC<Props> = ({data, status, profile_mutate}) => {
  const {user} = useUser({redirect: false});

  //getting user identities
  const {
    data: identities,
    mutate: identities_mutate,
    error,
  } = useSWR<any>(`/identities/${data.id}`, get);

  //handel get identities error
  if (!identities && !error) return <p>loading</p>;
  if (
    error?.response?.status === 400 ||
    (500 &&
      error?.response?.data?.error.startsWith(
        'invalid input syntax for type uuid',
      ))
  )
    return <p>invalid user identitiy</p>;

  return (
    <div className="border-1 mb-8 rounded-xl border border-grayLineBased md:w-4/6">
      <Header
        avatar={status === 'user' ? data?.avatar : data?.image}
        cover_image={data?.cover_image}
        status={status}
        following={identities?.following}
        id={data?.id}
        identities_mutate={identities_mutate}
        profile_mutate={profile_mutate}
        loggedIn={user ? true : false}
        own_user={
          status === 'user' && user?.username === data?.username
            ? true
            : status === 'organization' && user?.name === data?.name
            ? true
            : false
        }
      />
      <ProfileInfo
        first_name={data?.first_name}
        last_name={data?.last_name}
        bio={data?.bio}
        followings={data?.followings}
        followers={data?.followers}
      />

      {/* if user/organization is current user/organization show 'You' */}
      {status === 'user' && user?.username === data?.username ? (
        <p className="mt-3 px-4 text-sm text-secondary">You </p>
      ) : status === 'organization' && user?.name === data?.name ? (
        <p className="mt-3 px-4 text-sm text-secondary">You </p>
      ) : null}
      <ProjectItem title="Social Causes" items={data?.social_causes} />

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
