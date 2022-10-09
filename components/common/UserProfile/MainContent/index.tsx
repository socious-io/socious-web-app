/*
 * mainContent (left contetnt) of user/organization profile page
 * The type of profile is determined by status
 */

import React from 'react';
import {useRouter} from 'next/router';

// components
import Header from './Header';
import ProfileInfo from './ProfileInfo';
import Skills from './Skills';
import ProjectItem from './ProjectItem';
import Description from './Description';
import Contact from './Contact';
import Recommendations from './Recommendations';
import RightPaneContainer from '../RightPane/RightPaneContainer';
import ProjectList from '../RightPane/ProjectList';

// libraries
import useSWR, {KeyedMutator} from 'swr';

// utils
import {get} from 'utils/request';

// hooks
import {useUser} from '@hooks';

// interfaces
import {IdentityType} from '@models/identity';
interface Props {
  data: any;
  status: IdentityType;
  profile_mutate: KeyedMutator<any>;
  editProfile?: () => void;
}

const MainContent: React.FC<Props> = ({
  data,
  status,
  profile_mutate,
  editProfile,
}) => {
  const {user} = useUser({redirect: false});
  const router = useRouter();

  //getting user identities
  const {
    data: identities,
    mutate: identities_mutate,
    error,
  } = useSWR<any>(`/identities/${data.id}`, get);

  const {data: projects} = useSWR<any>(`/projects?identity=${data.id}&limit=3`);

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

  const handleProjectsFooterClick = () => {
    router.push(`/app/organization/${data.shortname}/projects`);
  };

  const own_user = status === 'users' && user?.username === data?.username
    ? true
    : status === 'organizations' && user?.name === data?.name
      ? true
      : false

  return (
    <div className="mb-8 flex w-full flex-col items-start gap-6 md:flex-row">
      <div className="border-1 rounded-xl border border-grayLineBased bg-white w-full md:w-4/6">
        <Header
          avatar={status === 'users' ? data?.avatar : data?.image}
          cover_image={data?.cover_image}
          status={status}
          following={identities?.following}
          id={data?.id}
          identities_mutate={identities_mutate}
          profile_mutate={profile_mutate}
          loggedIn={user ? true : false}
          own_user={own_user}
          editProfile={editProfile}
        />
        <ProfileInfo
          first_name={data?.first_name}
          last_name={data?.last_name}
          bio={data?.bio}
          followings={data?.followings}
          followers={data?.followers}
        />

        {/* if user/organization is current user/organization show 'You' */}
        {status === 'users' && user?.username === data?.username ? (
          <p className="mt-3 px-4 text-sm text-secondary">You </p>
        ) : status === 'organizations' && user?.name === data?.name ? (
          <p className="mt-3 px-4 text-sm text-secondary">You </p>
        ) : null}
        <ProjectItem title="Social Causes" items={data?.social_causes} />
        {status === 'users' ? (
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

        <Recommendations own_user={own_user} />

        <Description
          paragraph={data?.mission}
          title={status === 'users' ? 'About' : 'Mission'}
        />
        {status === 'users' && <Skills skills={data?.skills} />}
        <hr className="mb-20 border-grayLineBased" />
      </div>

      <div className="w-full md:w-2/6">
        <RightPaneContainer
          title="Activity"
          footer="See all activity"
          className="mb-4"
        >
          {/** change to activity list component */}
          <ProjectList list={[]} />
        </RightPaneContainer>
        <RightPaneContainer
          title="Projects"
          footer="See all projects"
          onClickFooter={handleProjectsFooterClick}
        >
          <ProjectList list={projects?.items || []} />
        </RightPaneContainer>
      </div>
    </div>
  );
};

export default MainContent;
