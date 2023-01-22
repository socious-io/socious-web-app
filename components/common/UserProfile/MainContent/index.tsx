/*
 * mainContent (left contetnt) of user/organization profile page
 * The type of profile is determined by status
 */

import React, {useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';

// components
import Header from './Header';
import ProfileInfo from './ProfileInfo';
import Skills from './Skills';
import ProjectItem from './ProjectItem';
import Description from './Description';
import Contact from './Contact';
import RightPaneContainer from '../RightPane/RightPaneContainer';
import ProjectList from '../RightPane/ProjectList';

// libraries
import useSWR, {KeyedMutator} from 'swr';

// utils
import {get} from 'utils/request';

// hooks
import {useUser} from '@hooks';

// interfaces
import {IdentityType, OtherIdentityMeta} from '@models/identity';
import {IProjectsResponse} from '@models/project';
interface Props {
  data: any;
  status: IdentityType;
  profile_mutate: KeyedMutator<any>;
  editProfile: () => void;
}

const MainContent: React.FC<Props> = ({
  data,
  status,
  profile_mutate,
  editProfile,
}) => {
  const {user, currentIdentity} = useUser({redirect: false});
  const router = useRouter();

  const {
    data: identities,
    mutate: identities_mutate,
    error,
  } = useSWR<OtherIdentityMeta>(`/identities/${data.id}`, get);

  // Call everytime identity change.
  useEffect(() => {
    identities_mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdentity?.id]);

  // TODO: Filter with status.
  const {data: projects} = useSWR<IProjectsResponse>(
    data?.id && identities?.type === 'organizations'
      ? `/projects?identity_id=${data.id}&status=ACTIVE`
      : null,
  );

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

  return (
    <div className="mb-8 flex w-full  flex-col items-start gap-6 md:flex-row">
      <div className="border-1 min-w-full rounded-xl border border-grayLineBased bg-white md:w-4/6">
        <Header
          avatar={status === 'users' ? data?.avatar : data?.image}
          cover_image={data?.cover_image}
          status={status}
          following={identities?.following ?? false}
          mutualConnection={
            (identities?.follower && identities?.following) ?? false
          }
          id={data?.id}
          identities_mutate={identities_mutate}
          profile_mutate={profile_mutate}
          loggedIn={user ? true : false}
          own_user={user?.id === data?.id}
          editProfile={editProfile}
          reported={data?.reported}
          impactPoints={data.impact_points}
        />
        <ProfileInfo
          first_name={data?.first_name}
          last_name={data?.last_name}
          bio={data?.bio}
          followings={data?.followings}
          followers={data?.followers}
          impact_points={data?.impact_points}
        />

        {/* if user/organization is current user/organization show 'You' */}
        {user?.id === data?.id && (
          <p className="mt-3 px-4 text-sm text-secondary">You </p>
        )}
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
        <Description paragraph={data?.mission} title="Mission" />
        {currentIdentity?.type === 'organizations' && (
          <Description paragraph={data?.culture} title="Culture" />
        )}
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
          <ProjectList list={projects?.items ?? []} />
        </RightPaneContainer>
      </div>
    </div>
  );
};

export default MainContent;
